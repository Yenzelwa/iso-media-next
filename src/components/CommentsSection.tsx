import React from "react";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { IsoComment, VideoComment } from "@/typings";
import Link from "next/link";

interface CommentProps {
    video_id: number;
}
interface ReplyVisibleMap {
    [key: string]: boolean;
}

const CommentSection: React.FC<CommentProps> = ({ video_id }) => {
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
                //   const response = await axios.get(`/api/comments/${video_id}`);
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
                debugger;
                setComments(comments);
                //  setComments(response.data);
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
                    post_date: new Date('2024-02-15'),
                    customer: {
                        id: 2556, // Assuming this is the default customer ID for new comments
                        name: "Umi Jili" // Assuming this is the default customer name for new comments
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
        } else {
            return 'Just now';
        }
    }

    const toggleReply = (commentId: number) => {
        debugger;
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
        debugger;
        const newReply = {
            id: comments.length + 1,
            reply: replyText,
            posted_date: new Date(),
            customer: {
                id: 2556,
                name: "John Doe"
            }
        };
        event.preventDefault();

        const commentIndexToUpdate = 2;

        const updatedComments = comments ? [...comments] : [];
        if (
            updatedComments &&
            updatedComments[commentIndexToUpdate] &&
            updatedComments[commentIndexToUpdate]?.reply !== null
        ) {
            updatedComments[commentIndexToUpdate]?.reply.push(newReply);
        }
        else {
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

    function handleTextareaChange(e: any) {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        setComment(textarea.value);
    }
    function handleReplyTextareaChange(e: any) {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        setReplyText(textarea.value);
    }
    return (
        <section>
            <div className="p">
                <div className="flex items-center mt-3">
                    <textarea
                        rows={1}
                        className="w-80 p-2 rounded-md border border-gray placeholder-gray text-black"
                        placeholder="Share your thoughts"
                        name="s"
                        value={comment}
                        onChange={(e) => handleTextareaChange(e)}
                    />
                    <button
                        type="submit"
                        className="bg-red text-white px-4 py-2 hover:bg-red-600 rounded-md ml-2"
                        onClick={PostComment}
                    >
                        Comment
                    </button>
                </div>
                {comments.map(videoComment => (
                    <div key={videoComment.iso_comment.id} className="p-4">
                        <ul className="list-inside space-y-4">
                            <li className="list-inside-item" key={videoComment.iso_comment.id}>
                                <div className="flex items-center space-x-3">
                                    <span className="text-gray hover:underline font-bold">
                                        {videoComment.customer.name}
                                    </span>
                                    <span className="text-gray hover:text-gray-700">
                                        {formatPostedTime(videoComment.post_date.toString())}
                                    </span>
                                </div>
                                <div>
                                    <p className="pb-2 trending-dec w-100 mb-0">
                                        {videoComment.iso_comment.comment}

                                        <button className="p-2 text-red" onClick={() => {
                                            toggleReply(videoComment.iso_comment.id);
                                        }}>
                                            Reply
                                        </button>
                                    </p>

                                    {replyVisibleMap[videoComment.iso_comment.id]  &&(
                                        <form onSubmit={(e) => handleSubmit(e, videoComment.iso_comment.id)}>
                                            <textarea
                                                rows={1}
                                                className="w-80 p-2 rounded-md border border-gray placeholder-gray text-black"
                                                placeholder="Write your reply..."
                                                onChange={(e) => handleReplyTextareaChange(e)}
                                            />
                                            <button type="button" onClick={() => toggleReply(videoComment.iso_comment.id)} className="p-2 text-gray">
                                                Cancel
                                            </button>
                                            <button type="submit" className="p-2 text-red">
                                                Submit
                                            </button>
                                        </form>
                                    )}
                                    <p className="pb-2 trending-dec w-100 mb-0">
                                        <button className="p-2 text-red" onClick={() => {
                                            setShowReplies(!showReplies);
                                            toggleReplies(videoComment.iso_comment.id);
                                        }}>
                                            {videoComment && videoComment.reply && videoComment.reply.length > 0 ?
                                                (showReplies ? `Hide Replies (${videoComment.reply.length})` : `View Replies (${videoComment.reply.length})`) :
                                                ('')
                                            }
                                        </button>
                                    </p>

                                    {repliesVisibleMap[videoComment.iso_comment.id] && showReplies && videoComment.reply && videoComment.reply.map((reply, index) => (
                                        <div key={index} className="ml-4">
                        <ul className="list-inside space-y-4">
                            <li className="list-inside-item" key={reply.id}>
                                <div className="flex items-center space-x-3">
                                    <span className="text-gray hover:underline font-bold">
                                        {reply.customer.name}
                                    </span>
                                    <span className="text-gray hover:text-gray-700">
                                        {formatPostedTime(reply.posted_date.toString())}
                                    </span>
                                </div>
                                <p className="pb-2 trending-dec w-100 mb-0">
                                        {reply.reply}
                                    </p>
                                <div>
                                </div>
                            </li>
                        </ul>
                
                                        </div>
                                    ))}
                                </div>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CommentSection;
