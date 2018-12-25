# ts-graphql-typeorm-server

A basic typescript-GraphQL server boilerplate with authentication

#### Features

  - Jwt based authentication
  - Register
    - Creates an email confirmation link with a unique id. 
     - Sends a confirmation email to the user with the link. 
     - Once the user clicks the link, the account gets activated.
  - Login
  - Logout
     - Invalidates the token by adding it to the redis store. 
     - Authentication checks the incoming tokens against the stored tokens inside redis.
  - Google OAuth
  - Reset password
    - Creates a password reset link with a unique id.
    - Locks the account for 20 minutes
    - Sends a password reset email with the link
    - User provides a new password
    - Unlocks the account and updates the password
