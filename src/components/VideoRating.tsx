import StarIcon from "./shared/StarIcon"

const VideoRating = () =>{
    return (
        <div className="bg-white p-4">
        <div className="flex items-center mt-3 mb-3">
            <label className="mr-2">Your rating</label>
            <ul className="list-none p-0 m-0 flex items-center text-red-500 space-x-2">
                <li>
                    <a className="text-red" href="#">
                        <StarIcon />
                    </a>
                </li>
                <li>
                    <a className="text-red" href="#">
                        <StarIcon />
                    </a>
                </li>
                <li>
                    <a className="text-red-500" href="#">
                        <StarIcon />
                    </a>
                </li>
                <li>
                    <a className="text-red" href="#">
                        <StarIcon />
                    </a>
                </li>
                <li>
                    <a className="text-red" href="#">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" color="red" height="15" width="15" xmlns="http://www.w3.org/2000/svg" ><path fill="none" d="M0 0h24v24H0z"></path><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></svg>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    )
}