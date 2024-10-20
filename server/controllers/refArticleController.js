import ArticleCounter from "../models/refModel.js";

const getNextRefArticle = async (req, res) => {
  try {
    // Find the last article counter (or create one if none exists)
    let counter = await ArticleCounter.findOne({ where: { id: 1 } });

    if (!counter) {
      counter = await ArticleCounter.create({ lastNumArticle: '0000' });
    }
    console.log("mandeha ny resake counter")
    // Increment and format the next reference number
    let lastNumber = parseInt(counter.lastNumArticle, 10);
    lastNumber += 1;
    const nextRefArticle = lastNumber.toString().padStart(4, '0'); // Zero-padding to 4 digits

    // Update the counter with the new reference number
    counter.lastNumArticle = nextRefArticle;
    await counter.save(); // Save the updated counter to the database

    // Respond with the next reference number
    res.status(200).json({ refArticle: nextRefArticle });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la génération du numéro d\'article' });
  }
};

export {
  getNextRefArticle,
};
