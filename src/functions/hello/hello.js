exports.handler = async (image, position, images) => {
  try {
    const img = document.getElementById('easel');
    img.src = ""
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
