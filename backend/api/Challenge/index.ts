import { HTTPRequest } from "../../HTTPFunction";
import { Mongo } from "../../_core/MongoDB";

export default async (req: HTTPRequest<{
    challengeId: string
}>) => {
    return await Mongo<IChallenge>('Challenge').findById({
        _id: req.body.challengeId
    })
}