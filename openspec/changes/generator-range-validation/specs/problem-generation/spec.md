## MODIFIED Requirements

### Requirement: Range constraints
The system SHALL constrain generated problem operands and results according to normalized effective result and factor ranges.

#### Scenario: Result boundaries are reversed
- **GIVEN** the configured result lower boundary is greater than the configured result higher boundary
- **WHEN** a problem set is generated
- **THEN** the effective result range uses the smaller value as the minimum
- **AND** the larger value as the maximum

#### Scenario: Factor boundaries are reversed
- **GIVEN** the configured factor lower boundary is greater than the configured factor higher boundary
- **WHEN** a problem set is generated
- **THEN** the effective factor range uses the smaller value as the minimum
- **AND** the larger value as the maximum

#### Scenario: Multiplication problem
- **GIVEN** multiplication is selected
- **WHEN** a multiplication problem is generated
- **THEN** both factors are within the effective factor range
- **AND** their product is within the effective result range

#### Scenario: Division problem
- **GIVEN** division is selected
- **WHEN** a division problem is generated
- **THEN** the dividend is a valid product within the effective result range
- **AND** the divisor is within the effective factor range
- **AND** the quotient is a whole number

#### Scenario: Addition problem
- **GIVEN** addition is selected
- **WHEN** an addition problem is generated
- **THEN** both addends are within the effective factor range
- **AND** their sum is within the effective result range

#### Scenario: Subtraction problem
- **GIVEN** subtraction is selected
- **WHEN** a subtraction problem is generated
- **THEN** both operands are within the effective factor range
- **AND** the difference is within the effective result range
