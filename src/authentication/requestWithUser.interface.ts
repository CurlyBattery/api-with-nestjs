import { Request } from 'express';
import UserEntity from '../users/entities/user.entity';

interface RequestWithUser extends Request {
  user: UserEntity;
}

export default RequestWithUser;
