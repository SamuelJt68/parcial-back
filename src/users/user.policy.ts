import { Policy, type PolicyBefore } from '@nestjs/authorization';
import type { User } from './entities/user.entity.js';

@Policy()
export class UserPolicy implements PolicyBefore<User> {
  before(user: User | null) {
    if (user?.roles?.some((r) => r.role_name === 'admin')) return true;
  }

  list(_user: User | null) {
    return false; //return Boolean(user?.roles?.some((r) => r.role_name === 'supervisor'));
  }

  assignRoles(_user: User | null) {
    return false;
  }
}

  

  


