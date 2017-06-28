#### Image Request
the most basic image request URL looks like this:

https://www.gravatar.com/avatar/HASH
To ensure a consistent and accuate hash, the following steps shold be taken to create a hash:
1. trim leading adn trailing whitespace from an email address
2. Force all characters to lower-case
3. md5 hash the final string

#### size
By default, images are presented a5 80px by 80px if no siz
e parameter is supllied. You may request a specific image size,
 whick will be dynamically delivered from Grabatar
  by using the s= or size= parameter and passing a single pixel dimension