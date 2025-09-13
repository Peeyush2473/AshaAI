const formatDate = (dateString) => {
  if (!dateString) {
    return 'No date provided';
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
};

export default formatDate;
