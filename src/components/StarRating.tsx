interface StarRatingProps {
  rating: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <ul className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <li key={star} className="list-item ml-2 first:ml-0 text-left">
          <div className={`inline ${star <= rating ? 'text-red-900' : ''}`}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              color="red"
              height="15"
              width="15"
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-hidden text-red-600 align-middle stroke-0 fill-red-600 h-[15px] stroke-red-600 w-[15px]"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
            </svg>
          </div>
        </li>
      ))}
    </ul>
  );
};
