## Purpose

Define the interactive exercise page where children solve generated arithmetic problems and check their answers.

## Requirements

### Requirement: Exercise route
The system SHALL expose interactive exercises at the `/test` route.

#### Scenario: User opens exercise route
- **WHEN** the user navigates to `/test`
- **THEN** the interactive exercise page is displayed
- **AND** it uses the current shared generator settings

### Requirement: Exercise problem generation
The system SHALL generate a fresh exercise problem set from the current settings.

#### Scenario: Exercise page mounts
- **WHEN** the exercise page is first displayed
- **THEN** it generates a problem set using the current problem count, operations, result range, and factor range
- **AND** it creates an empty answer entry for each problem
- **AND** it stores the expected answer for each problem

#### Scenario: User requests a new set
- **WHEN** the user selects generate new set
- **THEN** a new problem set is generated
- **AND** all answer inputs and checked state are reset

### Requirement: Answer entry
The system SHALL let users enter numeric answers for each exercise problem.

#### Scenario: User types an answer
- **WHEN** the user edits an answer input
- **THEN** the matching answer entry is updated

#### Scenario: User presses Enter
- **GIVEN** focus is in an answer input that is not the final input
- **WHEN** the user presses Enter
- **THEN** focus moves to the next answer input

### Requirement: Answer checking
The system SHALL validate entered answers against the generated problem operations.

#### Scenario: User checks answers
- **WHEN** the user selects check answers
- **THEN** multiplication answers are checked by multiplying operands
- **AND** division answers are checked by dividing operand A by operand B
- **AND** addition answers are checked by adding operands
- **AND** subtraction answers are checked by subtracting operand B from operand A

#### Scenario: Some answers are incorrect
- **GIVEN** answers have been checked
- **WHEN** an answer is missing, non-numeric, or not equal to the expected answer
- **THEN** the corresponding problem card and input are styled as incorrect

#### Scenario: Results are checked
- **WHEN** answer checking completes
- **THEN** the page displays the number of correct answers out of the total number of problems

### Requirement: Exercise actions
The system SHALL provide exercise-level actions for checking answers, regenerating problems, language switching, and returning to the generator.

#### Scenario: No answers entered
- **GIVEN** every answer input is empty
- **WHEN** the exercise actions are displayed
- **THEN** the check answers action is disabled

#### Scenario: User returns to generator
- **WHEN** the user selects the back-to-generator action
- **THEN** the app navigates to `/`
