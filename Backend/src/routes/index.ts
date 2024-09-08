import Router from 'express';
import { getAllUsers, userLogin, userSignup } from '../controllers';
import { loginValidator, signupValidator, validate } from '../utils/validators';

const appRouter = Router();
appRouter.get("/users",getAllUsers);
appRouter.post("/register",validate(signupValidator),userSignup);
appRouter.post("/login",validate(loginValidator),userLogin);
// appRouter.get("/logout",);

export default appRouter;