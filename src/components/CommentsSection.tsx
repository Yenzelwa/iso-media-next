import React, { useState } from 'react';
import { MessageCircle, Send, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp } from 'lucide-react';

interface Comment {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  likes: number;
  dislikes: number;
  timestamp: Date;
  replies?: Comment[];
}

interface CommentsSectionProps {
  video_id: number;
}

const CommentSection: React.FC<CommentsSectionProps> = ({ video_id }) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: {
        name: 'Spiritual Seeker',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      text: 'This episode really opened my eyes to new perspectives on consciousness. The insights shared here are profound and life-changing.',
      likes: 24,
      dislikes: 1,
      timestamp: new Date('2024-01-15T10:30:00'),
      replies: [
        {
          id: 11,
          user: {
            name: 'Mindful Journey',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          text: 'I completely agree! This content has helped me on my spiritual journey.',
          likes: 8,
          dislikes: 0,
          timestamp: new Date('2024-01-15T11:45:00')
        },
        {
          id: 12,
          user: {
            name: 'Peaceful Mind',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          text: 'The meditation techniques mentioned really work! Thank you for sharing.',
          likes: 5,
          dislikes: 0,
          timestamp: new Date('2024-01-15T12:15:00')
        }
      ]
    },
    {
      id: 2,
      user: {
        name: 'Conscious Explorer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      text: 'The production quality and depth of knowledge presented in this series is exceptional. Thank you for creating such valuable content.',
      likes: 18,
      dislikes: 0,
      timestamp: new Date('2024-01-14T16:20:00'),
      replies: [
        {
          id: 21,
          user: {
            name: 'Wisdom Seeker',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          text: 'Absolutely! The cinematography and sound design really enhance the spiritual experience.',
          likes: 12,
          dislikes: 0,
          timestamp: new Date('2024-01-14T17:30:00')
        }
      ]
    },
    {
      id: 3,
      user: {
        name: 'Awakening Soul',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b2b5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      text: 'Can anyone recommend similar content? This episode resonated deeply with me and I\'m looking for more transformational material.',
      likes: 12,
      dislikes: 0,
      timestamp: new Date('2024-01-14T09:15:00')
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [showReplies, setShowReplies] = useState<{ [key: number]: boolean }>({});
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [visibleComments, setVisibleComments] = useState(3);
  const [commentLikes, setCommentLikes] = useState<{ [key: number]: { liked: boolean; disliked: boolean } }>({});

  // Mock additional comments for load more functionality
  const allComments = [
    ...comments,
    {
      id: 4,
      user: {
        name: 'Inner Light',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      text: 'The way this series approaches ancient wisdom through a modern lens is remarkable. It bridges the gap between traditional spirituality and contemporary understanding.',
      likes: 31,
      dislikes: 2,
      timestamp: new Date('2024-01-13T14:22:00')
    },
    {
      id: 5,
      user: {
        name: 'Enlightened Path',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      text: 'I\'ve been practicing meditation for years, but this episode taught me techniques I\'d never encountered before. Truly transformative content.',
      likes: 45,
      dislikes: 1,
      timestamp: new Date('2024-01-13T09:45:00'),
      replies: [
        {
          id: 51,
          user: {
            name: 'Meditation Master',
            avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          text: 'Which technique resonated most with you? I\'m always looking to expand my practice.',
          likes: 7,
          dislikes: 0,
          timestamp: new Date('2024-01-13T10:15:00')
        }
      ]
    }
  ];

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      user: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      text: newComment,
      likes: 0,
      dislikes: 0,
      timestamp: new Date()
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleSubmitReply = (e: React.FormEvent, commentId: number) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const reply: Comment = {
      id: Date.now(),
      user: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      text: replyText,
      likes: 0,
      dislikes: 0,
      timestamp: new Date()
    };

    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId
          ? { ...comment, replies: [...(comment.replies || []), reply] }
          : comment
      )
    );

    setReplyText('');
    setReplyingTo(null);
  };

  const toggleReplies = (commentId: number) => {
    setShowReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const handleCommentLike = (commentId: number, isReply = false, parentId?: number) => {
    if (isReply && parentId) {
      setComments(prevComments =>
        prevComments.map(comment =>
          comment.id === parentId
            ? {
                ...comment,
                replies: comment.replies?.map(reply =>
                  reply.id === commentId
                    ? { ...reply, likes: reply.likes + (commentLikes[commentId]?.liked ? -1 : 1) }
                    : reply
                )
              }
            : comment
        )
      );
    } else {
      setComments(prevComments =>
        prevComments.map(comment =>
          comment.id === commentId
            ? { ...comment, likes: comment.likes + (commentLikes[commentId]?.liked ? -1 : 1) }
            : comment
        )
      );
    }

    setCommentLikes(prev => ({
      ...prev,
      [commentId]: {
        liked: !prev[commentId]?.liked,
        disliked: false
      }
    }));
  };

  const handleCommentDislike = (commentId: number, isReply = false, parentId?: number) => {
    if (isReply && parentId) {
      setComments(prevComments =>
        prevComments.map(comment =>
          comment.id === parentId
            ? {
                ...comment,
                replies: comment.replies?.map(reply =>
                  reply.id === commentId
                    ? { ...reply, dislikes: reply.dislikes + (commentLikes[commentId]?.disliked ? -1 : 1) }
                    : reply
                )
              }
            : comment
        )
      );
    } else {
      setComments(prevComments =>
        prevComments.map(comment =>
          comment.id === commentId
            ? { ...comment, dislikes: comment.dislikes + (commentLikes[commentId]?.disliked ? -1 : 1) }
            : comment
        )
      );
    }

    setCommentLikes(prev => ({
      ...prev,
      [commentId]: {
        liked: false,
        disliked: !prev[commentId]?.disliked
      }
    }));
  };

  const loadMoreComments = () => {
    setVisibleComments(prev => Math.min(prev + 3, allComments.length));
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8">
      <div className="flex items-center space-x-4 mb-8">
        <div className="bg-red-600/20 p-3 rounded-xl">
          <MessageCircle className="w-6 h-6 text-red-400" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Discussion</h3>
          <p className="text-gray-400 text-sm">{allComments.length} comments in this conversation</p>
        </div>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-10">
        <div className="flex space-x-4">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Your avatar"
              className="w-12 h-12 rounded-full ring-2 ring-red-500/20"
            />
           
          </div>
          <div className="flex-1">
            <div className="bg-gray-800/30 rounded-2xl border border-gray-700/30 focus-within:border-red-500/50 transition-all duration-300">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts about this transformative episode..."
                className="w-full bg-transparent px-6 py-4 text-white placeholder-gray-400 focus:outline-none resize-none rounded-2xl"
                rows={3}
              />
              <div className="flex justify-between items-center px-6 pb-4">
                <span className="text-gray-500 text-sm">Be respectful and constructive</span>
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 disabled:hover:scale-100"
                >
                  <Send className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-8">
        {allComments.slice(0, visibleComments).map((comment) => (
          <div key={comment.id} className="space-y-6">
            {/* Main Comment */}
            <div className="flex space-x-4">
              <div className="relative">
                <img
                  src={comment.user.avatar}
                  alt={comment.user.name}
                  className="w-12 h-12 rounded-full ring-2 ring-gray-700/50"
                />
                
              </div>
              <div className="flex-1">
                <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="font-bold text-white">{comment.user.name}</span>
                    <span className="text-gray-400 text-sm">{formatTimestamp(comment.timestamp)}</span>
                   
                  </div>
                  <p className="text-gray-200 leading-relaxed">{comment.text}</p>
                </div>

                {/* Comment Actions */}
                <div className="flex items-center space-x-6 mt-4">
                  <button
                    onClick={() => handleCommentLike(comment.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                      commentLikes[comment.id]?.liked
                        ? 'bg-red-600/20 text-red-400 border border-red-500/30'
                        : 'text-gray-400 hover:text-red-400 hover:bg-red-600/10'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm font-medium">{comment.likes}</span>
                  </button>

                  <button
                    onClick={() => handleCommentDislike(comment.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                      commentLikes[comment.id]?.disliked
                        ? 'bg-gray-600/20 text-gray-300 border border-gray-500/30'
                        : 'text-gray-400 hover:text-gray-300 hover:bg-gray-600/10'
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span className="text-sm font-medium">{comment.dislikes}</span>
                  </button>

                  <button
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="text-gray-400 hover:text-white text-sm font-medium transition-colors px-3 py-2 rounded-xl hover:bg-gray-700/30"
                  >
                    Reply
                  </button>

                  {comment.replies && comment.replies.length > 0 && (
                    <button
                      onClick={() => toggleReplies(comment.id)}
                      className="flex items-center space-x-2 text-red-400 hover:text-red-300 text-sm font-medium transition-colors px-3 py-2 rounded-xl hover:bg-red-600/10"
                    >
                      {showReplies[comment.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      <span>{showReplies[comment.id] ? 'Hide' : 'View'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}</span>
                    </button>
                  )}
                </div>

                {/* Reply Form */}
                {replyingTo === comment.id && (
                  <form onSubmit={(e) => handleSubmitReply(e, comment.id)} className="mt-6 ml-4">
                    <div className="flex space-x-3">
                      <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Your avatar"
                        className="w-10 h-10 rounded-full ring-2 ring-red-500/20"
                      />
                      <div className="flex-1">
                        <div className="bg-gray-800/30 rounded-xl border border-gray-700/30 focus-within:border-red-500/50 transition-all duration-300">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={`Reply to ${comment.user.name}...`}
                            className="w-full bg-transparent px-4 py-3 text-white placeholder-gray-400 focus:outline-none resize-none rounded-xl"
                            rows={2}
                          />
                          <div className="flex justify-end items-center px-4 pb-3">
                            <div className="flex space-x-2">
                              <button
                                type="button"
                                onClick={() => setReplyingTo(null)}
                                className="text-gray-400 hover:text-white px-4 py-2 rounded-lg transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                disabled={!replyText.trim()}
                                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                )}

                {/* Replies */}
                {comment.replies && showReplies[comment.id] && (
                  <div className="ml-8 mt-6 space-y-4 border-l-2 border-gray-700/30 pl-6">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex space-x-3">
                        <div className="relative">
                          <img
                            src={reply.user.avatar}
                            alt={reply.user.name}
                            className="w-10 h-10 rounded-full ring-2 ring-gray-700/50"
                          />
                         
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-800/20 backdrop-blur-sm rounded-xl p-4 border border-gray-700/20">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-semibold text-white text-sm">{reply.user.name}</span>
                              <span className="text-gray-400 text-xs">{formatTimestamp(reply.timestamp)}</span>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">{reply.text}</p>
                          </div>
                          <div className="flex items-center space-x-4 mt-3">
                            <button
                              onClick={() => handleCommentLike(reply.id, true, comment.id)}
                              className={`flex items-center space-x-1 px-2 py-1 rounded-lg transition-all duration-300 ${
                                commentLikes[reply.id]?.liked
                                  ? 'bg-red-600/20 text-red-400'
                                  : 'text-gray-400 hover:text-red-400'
                              }`}
                            >
                              <ThumbsUp className="w-3 h-3" />
                              <span className="text-xs">{reply.likes}</span>
                            </button>
                            
                            <button
                              onClick={() => handleCommentDislike(reply.id, true, comment.id)}
                              className={`flex items-center space-x-1 px-2 py-1 rounded-lg transition-all duration-300 ${
                                commentLikes[reply.id]?.disliked
                                  ? 'bg-red-600/20 text-red-400'
                                  : 'text-gray-400 hover:text-red-400'
                              }`}
                            >
                              <ThumbsDown className="w-3 h-3" />
                              <span className="text-xs">{reply.dislikes}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Comments */}
      {visibleComments < allComments.length && (
        <div className="text-center mt-10">
          <button
            onClick={loadMoreComments}
            className="bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 border border-gray-700/50 hover:border-red-500/30 flex items-center space-x-3 mx-auto"
          >
            <ChevronDown className="w-5 h-5" />
            <span>Load {Math.min(3, allComments.length - visibleComments)} more comments</span>
          </button>
          <p className="text-gray-400 text-sm mt-3">
            Showing {visibleComments} of {allComments.length} comments
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
