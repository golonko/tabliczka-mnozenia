## Purpose

Define how the application creates arithmetic problem sets from user-selected settings for printable worksheets and interactive exercises.

## Requirements

### Requirement: Operation selection
The system SHALL generate problems from the enabled operation types: multiplication, division, addition, and subtraction.

#### Scenario: Multiple operations are enabled
- **GIVEN** more than one operation type is enabled
- **WHEN** a problem set is generated
- **THEN** each problem is randomly selected from the enabled operation types

#### Scenario: No operation is enabled
- **GIVEN** all operation toggles are disabled
- **WHEN** a problem set is generated
- **THEN** the generator falls back to multiplication problems

### Requirement: Problem count
The system SHALL attempt to generate the requested number of problems for each requested set.

#### Scenario: Enough valid unique problems exist
- **GIVEN** the selected operation and range settings allow enough unique problems
- **WHEN** a problem set is generated
- **THEN** the set contains the requested number of problems

#### Scenario: Settings are too constrained
- **GIVEN** the selected settings do not allow enough valid unique problems
- **WHEN** the generator reaches its safety attempt limit
- **THEN** it returns the valid problems generated so far

### Requirement: Range constraints
The system SHALL constrain generated problem operands and results according to the configured result and factor ranges.

#### Scenario: Multiplication problem
- **GIVEN** multiplication is selected
- **WHEN** a multiplication problem is generated
- **THEN** both factors are within the configured factor range
- **AND** their product is within the configured result range

#### Scenario: Division problem
- **GIVEN** division is selected
- **WHEN** a division problem is generated
- **THEN** the dividend is a valid product within the configured result range
- **AND** the divisor is within the configured factor range
- **AND** the quotient is a whole number

#### Scenario: Addition problem
- **GIVEN** addition is selected
- **WHEN** an addition problem is generated
- **THEN** both addends are within the configured factor range
- **AND** their sum is within the configured result range

#### Scenario: Subtraction problem
- **GIVEN** subtraction is selected
- **WHEN** a subtraction problem is generated
- **THEN** both operands are within the configured factor range
- **AND** the difference is within the configured result range

### Requirement: Unique display entries
The system SHALL avoid duplicate displayed problems within a generated set.

#### Scenario: Duplicate candidate is generated
- **GIVEN** a candidate problem has the same display text as an existing problem in the set
- **WHEN** the generator evaluates the candidate
- **THEN** the candidate is skipped
- **AND** generation continues until the requested count or safety limit is reached

### Requirement: Problem representation
The system SHALL represent each generated problem with operands, operation type, display text, and a unique id.

#### Scenario: Problem is emitted
- **WHEN** a problem is added to a generated set
- **THEN** it includes `operandA`, `operandB`, `operation`, `display`, and `id`
- **AND** the display text uses `•` for multiplication, `:` for division, `+` for addition, and `−` for subtraction
