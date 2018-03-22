import logger from '../../common/logger';

export default (request, response, ex, handleDefault) => {
  logger.error(ex);

  if (ex.type === 'NotAuthorizedError') {
    response.status(401).json({
      status: 'Unauthorized',
      message: ex.message
    });
  }
  else if (ex.type === 'NotImplementedError') {
    response.status(404).json({
      status: 'Not Found',
      message: ex.message
    });
  }
  else if (ex.type === 'ValidationError') {
    response.status(400).json({
      status: 'Bad Request',
      message: ex.message
    });
  }
  else if (handleDefault) {
    response.status(500).json({
      status: 'Server Error',
      message: 'An error has occurred while executing the operation.'
    });
  }
};
