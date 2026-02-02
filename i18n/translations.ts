// Supported languages
export type Language = 'en' | 'sv' | 'de' | 'fr' | 'es';

export interface Translations {
    memeTemplates: string;
    noMatchingTemplates: string;
    noTemplatesMatching: string;
    selectedTemplate: string;
    usage: string;
    unknownTemplate: string;
    useListToSee: string;
    pleaseProvideText: string;
    credentialsNotConfigured: string;
    failedToGenerate: string;
    errorGenerating: string;
    helpTitle: string;
    helpUsage: string;
    helpExamples: string;
    helpPopularTemplates: string;
    helpUseList: string;
    availableTemplates: string;
    // Documentation
    docDescription: string;
    docUsageTitle: string;
    docUsageText: string;
    docExamplesTitle: string;
    docTemplatesTitle: string;
    docSettingsTitle: string;
    docSettingsText: string;
    docSourceCode: string;
}

const translations: Record<Language, Translations> = {
    en: {
        memeTemplates: 'Meme Templates',
        noMatchingTemplates: 'No matching templates',
        noTemplatesMatching: 'No templates matching',
        selectedTemplate: 'Selected template',
        usage: 'Usage',
        unknownTemplate: 'Unknown meme template',
        useListToSee: 'Use `/meme list` to see available templates.',
        pleaseProvideText: 'Please provide text for the meme.',
        credentialsNotConfigured: 'Imgflip credentials not configured. Please ask an admin to configure the Meme Generator app settings.',
        failedToGenerate: 'Failed to generate meme. Please try again.',
        errorGenerating: 'Error generating meme. Please try again later.',
        helpTitle: 'Meme Generator',
        helpUsage: 'Usage',
        helpExamples: 'Examples',
        helpPopularTemplates: 'Popular templates',
        helpUseList: 'Use `/meme list` for the full list!',
        availableTemplates: 'Available Meme Templates',
        docDescription: 'Generate memes directly in Rocket.Chat using the /meme command with 20+ popular templates.',
        docUsageTitle: 'Usage',
        docUsageText: 'Type /meme followed by a template name and text in quotes.',
        docExamplesTitle: 'Examples',
        docTemplatesTitle: 'Available Templates',
        docSettingsTitle: 'Settings',
        docSettingsText: 'Configure your Imgflip credentials in Administration → Apps → Meme Generator → Settings. Create a free account at imgflip.com.',
        docSourceCode: 'Source Code',
    },
    sv: {
        memeTemplates: 'Meme-mallar',
        noMatchingTemplates: 'Inga matchande mallar',
        noTemplatesMatching: 'Inga mallar matchar',
        selectedTemplate: 'Vald mall',
        usage: 'Användning',
        unknownTemplate: 'Okänd meme-mall',
        useListToSee: 'Använd `/meme list` för att se tillgängliga mallar.',
        pleaseProvideText: 'Ange text för memen.',
        credentialsNotConfigured: 'Imgflip-uppgifter är inte konfigurerade. Be en administratör konfigurera Meme Generator-inställningarna.',
        failedToGenerate: 'Kunde inte skapa meme. Försök igen.',
        errorGenerating: 'Fel vid skapande av meme. Försök igen senare.',
        helpTitle: 'Meme Generator',
        helpUsage: 'Användning',
        helpExamples: 'Exempel',
        helpPopularTemplates: 'Populära mallar',
        helpUseList: 'Använd `/meme list` för hela listan!',
        availableTemplates: 'Tillgängliga meme-mallar',
        docDescription: 'Skapa memes direkt i Rocket.Chat med /meme-kommandot och 20+ populära mallar.',
        docUsageTitle: 'Användning',
        docUsageText: 'Skriv /meme följt av ett mallnamn och text inom citattecken.',
        docExamplesTitle: 'Exempel',
        docTemplatesTitle: 'Tillgängliga mallar',
        docSettingsTitle: 'Inställningar',
        docSettingsText: 'Konfigurera dina Imgflip-uppgifter i Administration → Apps → Meme Generator → Settings. Skapa ett gratis konto på imgflip.com.',
        docSourceCode: 'Källkod',
    },
    de: {
        memeTemplates: 'Meme-Vorlagen',
        noMatchingTemplates: 'Keine passenden Vorlagen',
        noTemplatesMatching: 'Keine Vorlagen gefunden für',
        selectedTemplate: 'Ausgewählte Vorlage',
        usage: 'Verwendung',
        unknownTemplate: 'Unbekannte Meme-Vorlage',
        useListToSee: 'Verwenden Sie `/meme list` um verfügbare Vorlagen anzuzeigen.',
        pleaseProvideText: 'Bitte geben Sie Text für das Meme ein.',
        credentialsNotConfigured: 'Imgflip-Anmeldedaten nicht konfiguriert. Bitten Sie einen Administrator, die Meme Generator-Einstellungen zu konfigurieren.',
        failedToGenerate: 'Meme konnte nicht erstellt werden. Bitte versuchen Sie es erneut.',
        errorGenerating: 'Fehler beim Erstellen des Memes. Bitte versuchen Sie es später erneut.',
        helpTitle: 'Meme Generator',
        helpUsage: 'Verwendung',
        helpExamples: 'Beispiele',
        helpPopularTemplates: 'Beliebte Vorlagen',
        helpUseList: 'Verwenden Sie `/meme list` für die vollständige Liste!',
        availableTemplates: 'Verfügbare Meme-Vorlagen',
        docDescription: 'Erstellen Sie Memes direkt in Rocket.Chat mit dem /meme-Befehl und 20+ beliebten Vorlagen.',
        docUsageTitle: 'Verwendung',
        docUsageText: 'Geben Sie /meme gefolgt von einem Vorlagennamen und Text in Anführungszeichen ein.',
        docExamplesTitle: 'Beispiele',
        docTemplatesTitle: 'Verfügbare Vorlagen',
        docSettingsTitle: 'Einstellungen',
        docSettingsText: 'Konfigurieren Sie Ihre Imgflip-Anmeldedaten unter Administration → Apps → Meme Generator → Settings. Erstellen Sie ein kostenloses Konto auf imgflip.com.',
        docSourceCode: 'Quellcode',
    },
    fr: {
        memeTemplates: 'Modèles de mèmes',
        noMatchingTemplates: 'Aucun modèle correspondant',
        noTemplatesMatching: 'Aucun modèle correspondant à',
        selectedTemplate: 'Modèle sélectionné',
        usage: 'Utilisation',
        unknownTemplate: 'Modèle de mème inconnu',
        useListToSee: 'Utilisez `/meme list` pour voir les modèles disponibles.',
        pleaseProvideText: 'Veuillez fournir du texte pour le mème.',
        credentialsNotConfigured: 'Identifiants Imgflip non configurés. Demandez à un administrateur de configurer les paramètres du Meme Generator.',
        failedToGenerate: 'Échec de la génération du mème. Veuillez réessayer.',
        errorGenerating: 'Erreur lors de la génération du mème. Veuillez réessayer plus tard.',
        helpTitle: 'Générateur de Mèmes',
        helpUsage: 'Utilisation',
        helpExamples: 'Exemples',
        helpPopularTemplates: 'Modèles populaires',
        helpUseList: 'Utilisez `/meme list` pour la liste complète!',
        availableTemplates: 'Modèles de mèmes disponibles',
        docDescription: 'Créez des mèmes directement dans Rocket.Chat avec la commande /meme et plus de 20 modèles populaires.',
        docUsageTitle: 'Utilisation',
        docUsageText: 'Tapez /meme suivi d\'un nom de modèle et du texte entre guillemets.',
        docExamplesTitle: 'Exemples',
        docTemplatesTitle: 'Modèles disponibles',
        docSettingsTitle: 'Paramètres',
        docSettingsText: 'Configurez vos identifiants Imgflip dans Administration → Apps → Meme Generator → Settings. Créez un compte gratuit sur imgflip.com.',
        docSourceCode: 'Code source',
    },
    es: {
        memeTemplates: 'Plantillas de Memes',
        noMatchingTemplates: 'No hay plantillas coincidentes',
        noTemplatesMatching: 'No hay plantillas que coincidan con',
        selectedTemplate: 'Plantilla seleccionada',
        usage: 'Uso',
        unknownTemplate: 'Plantilla de meme desconocida',
        useListToSee: 'Usa `/meme list` para ver las plantillas disponibles.',
        pleaseProvideText: 'Por favor proporciona texto para el meme.',
        credentialsNotConfigured: 'Credenciales de Imgflip no configuradas. Pide a un administrador que configure los ajustes del Meme Generator.',
        failedToGenerate: 'Error al generar el meme. Por favor intenta de nuevo.',
        errorGenerating: 'Error al generar el meme. Por favor intenta más tarde.',
        helpTitle: 'Generador de Memes',
        helpUsage: 'Uso',
        helpExamples: 'Ejemplos',
        helpPopularTemplates: 'Plantillas populares',
        helpUseList: '¡Usa `/meme list` para la lista completa!',
        availableTemplates: 'Plantillas de memes disponibles',
        docDescription: 'Genera memes directamente en Rocket.Chat usando el comando /meme con más de 20 plantillas populares.',
        docUsageTitle: 'Uso',
        docUsageText: 'Escribe /meme seguido de un nombre de plantilla y texto entre comillas.',
        docExamplesTitle: 'Ejemplos',
        docTemplatesTitle: 'Plantillas disponibles',
        docSettingsTitle: 'Configuración',
        docSettingsText: 'Configura tus credenciales de Imgflip en Administración → Apps → Meme Generator → Settings. Crea una cuenta gratuita en imgflip.com.',
        docSourceCode: 'Código fuente',
    },
};

export function getTranslations(lang: string): Translations {
    const language = (lang || 'en') as Language;
    return translations[language] || translations.en;
}
