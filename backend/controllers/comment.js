const Comment = require('../models/Comment');
const fs = require('fs');


exports.createComment = (req, res, next) => {
  const postId = req.params.id;
  const commentObject = req.body;
  commentObject["postId"] = postId;

  if(req.file) {
      commentObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  }
  console.log(req.file);
  console.log(postId);
  console.log(commentObject);
  console.log(req.params.id); // CommentgetOneCommentId

  const comment = new Comment(commentObject);
  comment.save()
    .then(() => res.status(201).json({ message: 'Commentaire enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyComment = (req, res, next) => {
  Comment.findOne({ _id: req.params.id })
  .then((comment) =>{
    const userAuthorized = comment.userId === req.auth.userId || req.auth.userId=== process.env.ADMIN_ID;
    console.log(userAuthorized)
    if (!userAuthorized) {
      res.status(400).json({
        error: new Error('Unauthorized request!')
      });
    }
    else{
      const commentObject = req.file ?
      {
        ...JSON.parse(req.bodycomment),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
      Comment.updateOne({ _id: req.params.id }, { ...commentObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(500).json({ error }));
    }
  })
};

exports.getComment = (req, res, next) => {
  Comment.find({
    postId: req.params.id
  }).then(
    (comment) => {
      res.status(200).json(comment);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.deleteComment = (req, res, next) => {
  Comment.findOne({ _id: req.params.id })
    .then(comment => {
      if (comment.userId !== req.auth.userId) {
        res.status(403).json({
          error: new Error('Unauthorized request!')
        });
      }
      else{
        console.log("Je passe ici")
     
      if(comment.imageUrl) {
        const filename = comment.imageUrl.split('/images/')[1];
        // Vérifier que le fichier existe ?
        fs.unlinkSync(`images/${filename}`); 
      }
      
      Comment.deleteOne({ _id: req.params.id })
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

// exports.deleteCommentObject._id;
exports.likeAndDislike = (req, res, next) => {

  let userId = req.body.userId
  let postId = req.params.id
  let like = req.body.like

  console.log(postId)


  if (like === 1) { // Si il s'agit d'un like
    Comment.updateOne({ _id: postId },
      {
        // On push l'utilisateur et on incrémente le compteur de 1
        $push: { usersLiked: userId },
        $inc: { likes: +1 }, // On incrémente de 1
      })
      .then(() => res.status(200).json({ message: 'j\'aime ajouté !' }))
      .catch((error) => res.status(400).json({ error }))
  }
  if (like === -1) {
    Comment.updateOne( // S'il s'agit d'un dislike
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
    Comment.findOne({ _id: postId })
      .then((post) => {
        if (post.usersLiked.includes(userId)) { // Annulation d'un like
          Comment.updateOne({ _id: postId }, 
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