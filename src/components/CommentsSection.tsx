'use client';

import { IsoComment, VideoComment } from "@/typings";
import React, { FormEvent, useEffect, useState } from "react";

interface CommentProps {
  video_id: number;
}

interface ReplyVisibleMap {
  [key: string]: boolean;
}

export function CommentSection({ video_id }: CommentProps) {
  const [comments, setComments] = useState<VideoComment[]>([]);
  const [comment, setComment] = useState('');
  const [isoComment, setIsoComment] = useState<IsoComment>();
  const [showReplies, setShowReplies] = useState(false);
  const [replyVisible, setReplyVisible] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replyVisibleMap, setReplyVisibleMap] = useState<ReplyVisibleMap>({});
  const [repliesVisibleMap, setRepliesVisibleMap] = useState<ReplyVisibleMap>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data for testing
      const comments: VideoComment[] = [
                    {
                        iso_comment: {
                            id: 1,
                            comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
                            customer_id: 1

                        },
                        post_date: new Date('2024-01-23'),
                        customer: {
                            id: 2556,
                            name: "John Smith"
                        },
                        reply: [
                            {
                                id: 1,
                                reply: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
                                posted_date: new Date('2024/02/10'),
                                customer: {
                                    id: 2556,
                                    name: "Nokukhanya Dumakude"
                                }
                            },
                            {
                                id: 2,
                                reply: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
                                posted_date: new Date('2024/01/05'),
                                customer: {
                                    id: 2556,
                                    name: "Nicholas Jili"
                                }
                            },
                            {
                                id: 3,
                                reply: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
                                posted_date: new Date('2024/02/12'),
                                customer: {
                                    id: 2556,
                                    name: "Umi Jili"
                                }
                            },
                        ]
                    },
                    {
                        iso_comment: {
                            id: 2,
                            comment: "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.",
                            customer_id: 2
                        },
                        post_date: new Date('2024-02-13'),
                        customer: {
                            id: 2556,
                            name: "Tim Cook"
                        },
                        reply: [
                            {
                                id: 1,
                                reply: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
                                posted_date: new Date('2024/02/11'),
                                customer: {
                                    id: 2556,
                                    name: "New Guy"
                                }
                            },
                            {
                                id: 2,
                                reply: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
                                posted_date: new Date('2024/03/09'),
                                customer: {
                                    id: 2556,
                                    name: "Nicholas Jili"
                                }
                            },
                            {
                                id: 3,
                                reply: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
                                posted_date: new Date('2024/02/01'),
                                customer: {
                                    id: 2556,
                                    name: "Umi Jili"
                                }
                            },
                        ]
                    }

                ];
                setComments(comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchData();
  }, [video_id]);

  useEffect(() => {
    if (isoComment) {
      setComments(prevComments => {
        const newComment: VideoComment = {
          iso_comment: {
            id: isoComment.id,
            comment: isoComment.comment,
            customer_id: isoComment.customer_id
          },
          post_date: new Date(),
          customer: {
            id: 2556,
            name: "Umi Jili"
          },
          reply: null
        };
        return [...prevComments, newComment];
      });
    }
  }, [isoComment]);

  function PostComment() {
    const data: IsoComment = {
      id: Math.floor(Math.random() * 1000),
      comment: comment,
      customer_id: 1
    };
    setIsoComment(data);
    setComment('');
  }

  function formatPostedTime(postDate: string) {
    const currentDate = new Date();
    const postedDate = new Date(postDate);
    const diffInMs = currentDate.getTime() - postedDate.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''}`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''}`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''}`;
    }
    return 'Just now';
  }

  const toggleReply = (commentId: number) => {
    setReplyVisibleMap(prevState => ({
      ...prevState,
      [commentId]: !prevState[commentId]
    }));
  };

  const toggleReplies = (commentId: number) => {
    setRepliesVisibleMap(prevState => ({
      ...prevState,
      [commentId]: !prevState[commentId]
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>, commentId: number) => {
    event.preventDefault();

    const newReply = {
      id: comments.length + 1,
      reply: replyText,
      posted_date: new Date(),
      customer: {
        id: 2556,
        name: "John Doe"
      }
    };

    const commentIndexToUpdate = 2;
    const updatedComments = comments ? [...comments] : [];

    if (updatedComments[commentIndexToUpdate]?.reply) {
      updatedComments[commentIndexToUpdate].reply.push(newReply);
    } else if (updatedComments[commentIndexToUpdate]) {
      updatedComments[commentIndexToUpdate].reply = [newReply];
    }

    setReplyText('');
    setReplyVisible(false);
    updateComments(updatedComments);
    toggleReply(commentId);
  };

  const updateComments = (updatedComments: VideoComment[]) => {
    setComments(updatedComments);
  };

  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    setComment(textarea.value);
  }

  function handleReplyTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    setReplyText(textarea.value);
  }

  return (
         <section className="comments-section bg-gray-900 rounded-xl shadow-2xl">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Comments</h2>

        {/* Comment Input */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex-grow">
            <textarea
              rows={1}
              className="w-full p-4 rounded-xl border border-gray-700 bg-gray-800 placeholder-gray-400 text-white resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
              placeholder="Share your thoughts"
              value={comment}
              onChange={handleTextareaChange}
            />
          </div>
          <button
            type="button"
            className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transform hover:scale-105 transition duration-200 font-semibold shadow-lg"
            onClick={PostComment}
          >
            Comment
          </button>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((videoComment) => (
            <article
              key={videoComment.iso_comment.id}
              className="bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              {/* Comment Header */}
              <header className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-semibold">
                  {videoComment.customer.name.charAt(0)}
                </div>
                <div className="flex-grow">
                  <span className="text-white font-semibold hover:text-red-500 transition duration-200">
                    {videoComment.customer.name}
                  </span>
                  <span className="text-gray-400 text-sm ml-3">
                    {formatPostedTime(videoComment.post_date.toString())}
                  </span>
                </div>
              </header>

              {/* Comment Content */}
              <div className="mb-4">
                <p className="text-gray-300 leading-relaxed">
                  {videoComment.iso_comment.comment}
                </p>
                <div className="flex items-center space-x-4 mt-4">
                  <button
                    className="text-gray-400 hover:text-red-500 flex items-center space-x-2 transition duration-200"
                    onClick={() => toggleReply(videoComment.iso_comment.id)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    <span>Reply</span>
                  </button>
                </div>
              </div>

              {/* Reply Form */}
              {replyVisibleMap[videoComment.iso_comment.id] && (
                <form
                  onSubmit={(e) => handleSubmit(e, videoComment.iso_comment.id)}
                  className="ml-8 mt-4"
                >
                  <textarea
                    rows={1}
                    className="w-full p-4 rounded-xl border border-gray-700 bg-gray-900 placeholder-gray-400 text-white resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                    placeholder="Write your reply..."
                    onChange={handleReplyTextareaChange}
                    value={replyText}
                  />
                  <div className="flex justify-end space-x-3 mt-3">
                    <button
                      type="button"
                      onClick={() => toggleReply(videoComment.iso_comment.id)}
                      className="px-4 py-2 rounded-lg text-gray-400 hover:text-gray-200 transition duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transform hover:scale-105 transition duration-200"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}

              {/* Replies Toggle */}
              {videoComment.reply && videoComment.reply.length > 0 && (
                <div className="mt-4">
                  <button
                    className="text-gray-400 hover:text-red-500 flex items-center space-x-2 transition duration-200"
                    onClick={() => {
                      setShowReplies(!showReplies);
                      toggleReplies(videoComment.iso_comment.id);
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={showReplies ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
                      />
                    </svg>
                    <span>
                      {showReplies
                        ? `Hide Replies (${videoComment.reply.length})`
                        : `View Replies (${videoComment.reply.length})`
                      }
                    </span>
                  </button>
                </div>
              )}

              {/* Replies List */}
              {repliesVisibleMap[videoComment.iso_comment.id] &&
               showReplies &&
               videoComment.reply?.map((reply, index) => (
                <div key={index} className="ml-8 mt-4 bg-gray-900 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-sm font-semibold">
                      {reply.customer.name.charAt(0)}
                    </div>
                    <div>
                      <span className="text-white font-semibold hover:text-red-500 transition duration-200">
                        {reply.customer.name}
                      </span>
                      <span className="text-gray-400 text-sm ml-3">
                        {formatPostedTime(reply.posted_date.toString())}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300 ml-11">
                    {reply.reply}
                  </p>
                </div>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CommentSection;
