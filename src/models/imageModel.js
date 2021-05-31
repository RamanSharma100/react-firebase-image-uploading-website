const imageModel = (name, url) => {
  const model = {
    name,
    url,
    createdAt: new Date(),
  };
  return model;
};

export default imageModel;
