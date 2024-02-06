import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
    token:string,
    username:string
}
export default function Handler(
    req:NextApiRequest,
    res:NextApiResponse<ResponseData>
){
  res.status(200).json({token:"GWFEH37455DFDGSFDHSJFDS" , username :"Nokukhanya Dumakude"})
}