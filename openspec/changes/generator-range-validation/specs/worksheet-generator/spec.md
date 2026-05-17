## MODIFIED Requirements

### Requirement: Worksheet settings controls
The system SHALL let users configure worksheet generation from the settings panel without destructively rewriting range values while the user is typing.

#### Scenario: User changes column count
- **WHEN** the user adjusts the column count control
- **THEN** the configured column count changes within the supported range of 2 through 8
- **AND** identical copies are reduced if they exceed the new column count

#### Scenario: User changes problems per column
- **WHEN** the user adjusts the problems-per-column control
- **THEN** the configured problem count changes within the supported range of 10 through 50

#### Scenario: User edits result range values
- **WHEN** the user types in either result range input
- **THEN** the raw typed value is preserved in the input
- **AND** the system does not overwrite the input solely because the temporary value is lower or higher than the other boundary

#### Scenario: User edits factor range values
- **WHEN** the user types in either factor range input
- **THEN** the raw typed value is preserved in the input
- **AND** the system does not overwrite the input solely because the temporary value is lower or higher than the other boundary

#### Scenario: Range boundaries are reversed
- **GIVEN** the lower boundary is greater than the higher boundary for result range or factor range
- **WHEN** the settings panel is displayed
- **THEN** the system shows localized helper or warning text explaining that the effective range will be interpreted from the smaller value to the larger value

#### Scenario: User toggles operations
- **WHEN** the user toggles operation controls
- **THEN** subsequent generation uses the selected operation settings
