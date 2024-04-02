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

module.exports = {
    dummy,
    totalLikes
}
