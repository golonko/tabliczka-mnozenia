## Purpose

Define the bilingual user interface behavior and translation maintenance expectations.

## Requirements

### Requirement: Supported languages
The system SHALL support Polish and English UI text.

#### Scenario: Application starts
- **WHEN** the application initializes
- **THEN** Polish is selected as the default language

#### Scenario: English is selected
- **WHEN** the user selects English
- **THEN** visible UI labels use English translations

#### Scenario: Polish is selected
- **WHEN** the user selects Polish
- **THEN** visible UI labels use Polish translations

### Requirement: Language controls
The system SHALL expose language controls on both the generator and exercise pages.

#### Scenario: Generator page is displayed
- **WHEN** the user is on `/`
- **THEN** Polish and English language controls are available in the settings panel

#### Scenario: Exercise page is displayed
- **WHEN** the user is on `/test`
- **THEN** Polish and English language controls are available in the exercise header

### Requirement: Translation completeness
The system SHALL keep translation keys available for every supported language.

#### Scenario: UI text is added
- **WHEN** a new UI label or action is introduced
- **THEN** the corresponding translation key is added for both Polish and English
- **AND** components read the label from `translations[language]`
