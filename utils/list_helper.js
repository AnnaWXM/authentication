// task require
const dummy = (blogs) => {
    const res = 1
    return res
}

const totalLikes = (blogs) => {
    let total = 0
    blogs.forEach(blog => {
        total += blog.likes || 0;
    });

    return total
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
      return "Error: the bloger list is empty";
    }

    const favorite = blogs.reduce((prev, current) => {
      return (prev.likes > current.likes) ? prev : current;
    });

    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    };
  };

const topAuthor = (blogs) => {
  if (blogs.length === 0) {
    return "Error: the bloger list is empty";
  }
  const blogCountByAuthor = {}
  blogs.forEach(blog => {
    if (blog.author in blogCountByAuthor) {
      blogCountByAuthor[blog.author]++;
    } else {
      blogCountByAuthor[blog.author] = 1;
    }
  })
  let maxAuthor = null;
  let authorNumber = 0;
  for (const author in blogCountByAuthor) {
    if (blogCountByAuthor[author] > authorNumber) {
      authorNumber = blogCountByAuthor[author];
      maxAuthor = author;
    }
  }

  return {
    author: maxAuthor,
    blogs: authorNumber
  }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return "Error: the bloger list is empty";
    }
    const likesForAuthors = {}
    blogs.forEach(blog => {
        if (blog.author in likesForAuthors) {
            likesForAuthors[blog.author]+= blog.likes || 0
        } else {
            likesForAuthors[blog.author] = blog.likes || 0
        }
      })
      let topAuthor = null;
      let likes = 0;
      for (const author in likesForAuthors) {
        if (likesForAuthors[author] > likes) {
            likes = likesForAuthors[author]
            topAuthor = author
        }
    }
    return{
        author: topAuthor,
        likes: likes
    }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    topAuthor,
    mostLikes
}
