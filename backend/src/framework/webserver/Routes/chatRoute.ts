import { Router } from "express";
import chatController from "../../../adaptors/chatController";
import { chatDbRepository } from "../../../app/Interfaces/chatDbRepository";
import { chatRepositoryMongodb } from "../../database/mongodb/repositories/chatRepositoryMongodb";

const chatRoutes = ()=>{
    const router = Router();
    const chat_Controller = chatController (
        chatDbRepository,
        chatRepositoryMongodb
    )

router.post("/conversations",chat_Controller.createNewChat)
router.get("/conversations/:senderId",chat_Controller.getChats)

router.post("/messages",chat_Controller.createNewMessage)
router.get("/messages/:conversationId",chat_Controller.getMessages)


    return router;
}

export default chatRoutes;