## Purpose

Define the worksheet generator page, its settings behavior, and the printable worksheet output.

## Requirements

### Requirement: Default generator settings
The system SHALL initialize the generator with the current default worksheet settings.

#### Scenario: User opens the generator page
- **WHEN** the application loads `/`
- **THEN** the generator settings default to 20 problems per column
- **AND** 4 columns
- **AND** 2 identical copies
- **AND** multiplication and division enabled
- **AND** addition and subtraction disabled
- **AND** result range 1 through 100
- **AND** factor range 1 through 10

### Requirement: Worksheet settings controls
The system SHALL let users configure worksheet generation from the settings panel.

#### Scenario: User changes column count
- **WHEN** the user adjusts the column count control
- **THEN** the configured column count changes within the supported range of 2 through 8
- **AND** identical copies are reduced if they exceed the new column count

#### Scenario: User changes problems per column
- **WHEN** the user adjusts the problems-per-column control
- **THEN** the configured problem count changes within the supported range of 10 through 50

#### Scenario: User changes numeric ranges
- **WHEN** the user edits result or factor range inputs
- **THEN** the settings preserve valid minimum and maximum relationships

#### Scenario: User toggles operations
- **WHEN** the user toggles operation controls
- **THEN** subsequent generation uses the selected operation settings

### Requirement: Automatic regeneration
The system SHALL regenerate worksheet problems when generation-relevant settings change.

#### Scenario: Settings change after initial generation
- **GIVEN** worksheet columns have already been generated
- **WHEN** the user changes problem count, columns, copies, operations, result range, or factor range
- **THEN** the worksheet data is regenerated

### Requirement: Identical copy groups
The system SHALL support repeated identical worksheet columns for class distribution.

#### Scenario: Copies are configured
- **GIVEN** the worksheet has a configured column count and identical copy count
- **WHEN** worksheet columns are generated
- **THEN** columns are generated in groups of the copy count
- **AND** every column in a group receives the same problem set
- **AND** the last group may contain fewer columns if the total column count is not divisible by the copy count

### Requirement: Printable worksheet layout
The system SHALL render worksheet columns in a print-optimized layout.

#### Scenario: Worksheet is displayed on screen
- **WHEN** worksheet data is available
- **THEN** each column renders numbered problems with answer lines
- **AND** dashed vertical dividers are shown between columns
- **AND** each column includes a score box at the bottom

#### Scenario: Problem density changes
- **WHEN** the number of problems or columns changes
- **THEN** problem text size adapts using container-based sizing
- **AND** text remains constrained by vertical and horizontal available space

#### Scenario: User prints worksheet
- **WHEN** the user selects the print action
- **THEN** the application calls the browser print flow
- **AND** non-print controls are hidden by print styles
- **AND** the worksheet prints without the screen preview frame

### Requirement: Generator navigation
The system SHALL provide a route from the generator page to the interactive exercise page.

#### Scenario: User starts an exercise
- **WHEN** the user selects the start exercise action
- **THEN** the app navigates from `/` to `/test`
