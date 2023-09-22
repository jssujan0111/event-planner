const notFound = (req,res,next)=>{
    const err = new Error(`Not Found-${req.originalUrl}--see the api docs`);
    err.status = 404;
    err.error = 'Not Found'
    err.response = {
        code: err.status,
        error: err.error,
        data: {
            message: err.message
        }
    }
    next(err);
};
module.exports ={
    notFound
}