import { instance } from './instances'

import { PostsService } from './services/posts'
import { UsersService } from './services/users'

const api = {
  posts: new PostsService(instance),
  users: new UsersService(instance)
}

export { api }
