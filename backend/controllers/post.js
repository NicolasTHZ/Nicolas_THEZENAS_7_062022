const Post = require('../models/Post');
const fs = require('fs');


exports.createPost = (req, res, next) => {
  const postObject = req.body;
  delete postObject._id;
  if(req.file) {
      postObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  }
  console.log(req.file);

  const post = new Post(postObject);
  post.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id
  }).then(
    (post) => {
      res.status(200).json(post);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyPost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
  .then((post) =>{
    const userAuthorized = post.userId === req.auth.userId || req.auth.userId=== process.env.ADMIN_ID;
    console.log(userAuthorized)
    if (!userAuthorized) {
      res.status(400).json({
        error: new Error('Unauthorized request!')
      });
    }
    else{
      const postObject = req.file ?
      {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
      Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(500).json({ error }));
    }
  })
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      const userAuthorized = post.userId === req.auth.userId || req.auth.role=== 'admin';
      console.log(userAuthorized)
      if (!userAuthorized) {
        res.status(403).json({
          error: new Error('Unauthorized request!')
        });
      }
      else{
        console.log("Je passe ici")
     
      if(post.imageUrl) {
        const filename = post.imageUrl.split('/images/')[1];
        // Vérifier que le fichier existe ?
        fs.unlinkSync(`images/${filename}`); 
      }
      
      Post.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Object Deleted'}))
        .catch(error => {
          res.status(400).json({ error })
        	});
      }
    })
    .catch(error => {
      console.log("Erreur : " , error);
      res.status(500).json({ error: error })
    });
};

exports.getAllPost = (req, res, next) => {
  Post.find().then(
    (posts) => {
      res.status(200).json(posts);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};


exports.likeAndDislike = (req, res, next) => {

  let userId = req.body.userId
  let postId = req.params.id
  let like = req.body.like


  if (like === 1) { // Si il s'agit d'un like
    Post.updateOne({ _id: postId },
      {
        // On push l'utilisateur et on incrémente le compteur de 1
        $push: { usersLiked: userId },
        $inc: { likes: +1 }, // On incrémente de 1
      })
      .then(() => res.status(200).json({ message: 'j\'aime ajouté !' }))
      .catch((error) => res.status(400).json({ error }))
  }
  if (like === -1) {
    Post.updateOne( // S'il s'agit d'un dislike
        { _id: postId }, 
        {
          $push: { usersDisliked: userId },
          $inc: { dislikes: +1 }, // On incrémente de 1
        }
      )
      .then(() => {
        res.status(200).json({
        message: 'Dislike ajouté !'
        })
      })
      .catch((error) => res.status(400).json({ error }))
  }
  if (like === 0) { // Dans le cas d'une annulation
    Post.findOne({ _id: postId })
      .then((post) => {
        if (post.usersLiked.includes(userId)) { // Annulation d'un like
          Post.updateOne({ _id: postId }, 
            {
              $pull: {
              usersLiked: userId
              },
              $inc: {
              likes: -1
              }, // On incrémente de -1
            })
            .then(() => res.status(200).json({
              message: 'Like retiré !'
            }))
            .catch((error) => res.status(400).json({
              error
            }))
        }
        if (post.usersDisliked.includes(userId)) { // Si il s'agit d'annuler un dislike
          Post.updateOne({ _id: postId }, 
            {
              $pull: { usersDisliked: userId },
              $inc: { dislikes: -1 }, // On incrémente de -1
            })
            .then(() => res.status(200).json({
              message: 'Dislike retiré !'
            }))
            .catch((error) => res.status(400).json({ error }))
        }
      })
      .catch((error) => res.status(404).json({ error }))
  }
};

