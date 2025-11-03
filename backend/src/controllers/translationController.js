const fs = require('fs');
const path = require('path');

const SUPPORTED_LANGUAGES = ['en', 'sv'];

exports.getTranslations = async (req, res) => {
  try {
    const { language } = req.params;

    if (!language) {
      return res.status(400).json({
        error: 'Language parameter is required'
      });
    }

    if (!SUPPORTED_LANGUAGES.includes(language.toLowerCase())) {
      return res.status(404).json({
        error: `Language '${language}' is not supported. Supported languages: ${SUPPORTED_LANGUAGES.join(', ')}`
      });
    }

    const translationFilePath = path.join(
      __dirname,
      '..',
      '..',
      'data',
      'translations',
      `${language.toLowerCase()}.json`
    );

    if (!fs.existsSync(translationFilePath)) {
      return res.status(404).json({
        error: `Translation file for language '${language}' not found`
      });
    }

    const translationData = fs.readFileSync(translationFilePath, 'utf-8');
    const translations = JSON.parse(translationData);

    res.json(translations);

  } catch (error) {
    console.error('Error loading translations:', error);
    res.status(500).json({
      error: 'Server error while loading translations'
    });
  }
};

exports.getSupportedLanguages = async (req, res) => {
  try {
    res.json({
      languages: SUPPORTED_LANGUAGES,
      default: 'en'
    });
  } catch (error) {
    console.error('Error getting supported languages:', error);
    res.status(500).json({
      error: 'Server error while getting supported languages'
    });
  }
};
