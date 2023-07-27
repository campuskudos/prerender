module.exports = {
  pageLoaded: (req, res, next) => {
    if (!req.prerender.content || req.prerender.renderType != 'html') {
      return res.send(404);
    }

    var found = req.prerender.content
      .toString()
      .includes(
        '<p class="large">This site was not found. Please check that you\'ve typed the right domain. Feel free to email us at <a href="mailto:support@peoplegrove.com">support@peoplegrove.com</a> with any questions.</p>'
      );

    if (found) {
      return res.send(404);
    }

    next();
  },
};
