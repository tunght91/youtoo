import { HTTPRequest } from "../../HTTPFunction";
import { Mongo } from "../../MongoDB";

export default async (req: HTTPRequest<{
    challengeId: string
    proofId: number
    commentId: number
}>) => {
    return await Mongo('Challenge').findOneAndUpdate({
        _id: req.body.challengeId,
        [`players.${req._auth().userId}.proofOfWorks.${req.body.proofId}.comments.${req.body.commentId}`]: {
            $exists: true
        }
    }, {
        $inc: {
            [`players.${req._auth().userId}.proofOfWorks.${req.body.proofId}.comments.${req.body.commentId}.likes`]: 1
        }
    }, {
        new: true
    })
}