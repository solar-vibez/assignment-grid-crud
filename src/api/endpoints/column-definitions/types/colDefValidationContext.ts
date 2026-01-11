/**
 * Represents context to implement validation rules for boolean column data type.
 */
type ColDefBooleanValidationContext = ColDefValidationContext & {
  // Whether null values are allowed for this boolean column.
  allowNull: boolean
  // The type of the validation context, indicating it's for boolean.
  type: 'boolean'
}

/**
 * Represents context to implement validation rules for breakdown column data type.
 */
type ColDefBreakdownValidationContext = ColDefValidationContext & {
  // Whether null values are allowed for this breakdown column.
  allowNull: boolean
  // The type of the validation context, indicating it's for breakdown.
  type: 'breakdown'
}

/**
 * Represents context to implement validation rules for classification column data type.
 */
type ColDefClassificationValidationContext = ColDefValidationContext & {
  // Whether null values are allowed for this classification column.
  allowNull: boolean
  // The type of the validation context, indicating it's for classification.
  type: 'classification'
}

/**
 * Represents context to implement validation rules for component choice column data type.
 */
type ColDefComponentChoiceValidationContext = ColDefValidationContext & {
  // Whether null values are allowed for this component choice column.
  allowNull: boolean
  // The type of the validation context, indicating it's for component choice.
  type: 'componentChoice'
}

/**
 * Represents context to implement validation rules for component tree choice column data type.
 */
type ColDefComponentTreeChoiceValidationContext = ColDefValidationContext & {
  // Whether null values are allowed for this component tree choice column.
  allowNull: boolean
  // The type of the validation context, indicating it's for component tree choice.
  type: 'componentTreeChoice'
}

/**
 * Represents context to implement validation rules for currency column data type.
 */
type ColDefCurrencyValidationContext = ColDefValidationContext & {
  // Whether null values are allowed for this currency column.
  allowNull: boolean
  // The type of the validation context, indicating it's for currency.
  type: 'currency'
}

/**
 * Represents context to implement validation rules for date column data type.
 */
type ColDefDateValidationContext = ColDefValidationContext & {
  // Whether null values are allowed for this date column.
  allowNull: boolean
  // The field that defines the lower bound constraint for date validation, if any.
  constraintLowerBoundField: null | string
  // The field that defines the upper bound constraint for date validation, if any.
  constraintUpperBoundField: null | string
  // Whether the bounds are inclusive for date validation.
  inclusive: boolean
  // The maximum allowable date value as a string.
  maxValue: string
  // The minimum allowable date value as a string.
  minValue: string
  // The type of the validation context, indicating it's for date.
  type: 'date'
}

/**
 * Represents context to implement validation rules for double column data type.
 */
type ColDefDoubleValidationContext = ColDefValidationContext & {
  // Whether null values are allowed for this double column.
  allowNull: boolean
  // The field that defines the lower bound constraint for double validation, if any.
  constraintLowerBoundField: null | string
  // The field that defines the upper bound constraint for double validation, if any.
  constraintUpperBoundField: null | string
  // Whether the bounds are inclusive for double validation.
  inclusive: boolean
  // The maximum allowable double value.
  maxValue: number
  // The minimum allowable double value.
  minValue: number
  // The type of the validation context, indicating it's for double.
  type: 'double'
}

/**
 * Represents context to implement validation rules for enum column data type.
 */
type ColDefEnumValidationContext = ColDefValidationContext & {
  // Whether null values are allowed for this enum column.
  allowNull: boolean
  // The type of the validation context, indicating it's for enum.
  type: 'enum'
}

/**
 * Represents context to implement validation rules for integer column data type.
 */
type ColDefIntegerValidationContext = ColDefValidationContext & {
  // Whether null values are allowed for this integer column.
  allowNull: boolean
  // The field that defines the lower bound constraint for integer validation, if any.
  constraintLowerBoundField: null | string
  // The field that defines the upper bound constraint for integer validation, if any.
  constraintUpperBoundField: null | string
  // Whether the bounds are inclusive for integer validation.
  inclusive: boolean
  // The maximum allowable integer value.
  maxValue: number
  // The minimum allowable integer value.
  minValue: number
  // The type of the validation context, indicating it's for integer.
  type: 'int'
}

/**
 * Represents context to implement validation rules for monetary value column data type.
 */
type ColDefMonetaryValueValidationContext = ColDefValidationContext & {
  // Whether null values are allowed for this monetary value column.
  allowNull: boolean
  // The field that defines the lower bound constraint for monetary value validation, if any.
  constraintLowerBoundField: null | string
  // The field that defines the upper bound constraint for monetary value validation, if any.
  constraintUpperBoundField: null | string
  // The supplier of currency rates for monetary value validation.
  currencyRateListSupplier: CurrencyRateListSupplier
  // Whether the bounds are inclusive for monetary value validation.
  inclusive: boolean
  // The maximum allowable monetary value.
  maxValue: number
  // The minimum allowable monetary value.
  minValue: number
  // The type of the validation context, indicating it's for monetary value.
  type: 'monetaryValue'
}

/**
 * Represents context to implement validation rules for percentage column data type.
 */
type ColDefPercentageValidationContext = ColDefValidationContext & {
  // Whether null values are allowed for this percentage column.
  allowNull: boolean
  // The field that defines the lower bound constraint for percentage validation, if any.
  constraintLowerBoundField: null | string
  // The field that defines the upper bound constraint for percentage validation, if any.
  constraintUpperBoundField: null | string
  // Whether the bounds are inclusive for percentage validation.
  inclusive: boolean
  // The maximum allowable percentage value.
  maxValue: number
  // The minimum allowable percentage value.
  minValue: number
  // The type of the validation context, indicating it's for percentage.
  type: 'percentage'
}

/**
 * Represents context to implement validation rules for string column data type.
 */
type ColDefStringValidationContext = ColDefValidationContext & {
  // The maximum allowable length of the string.
  maxLength: number
  // The minimum allowable length of the string.
  minLength: number
  // The type of the validation context, indicating it's for string.
  type: 'string'
}

type ColDefValidationContext = object

/**
 * Represents context to implement validation rules for different column data types.
 */
type ColDefValidationContextUnion =
  | ColDefBooleanValidationContext
  | ColDefBreakdownValidationContext
  | ColDefClassificationValidationContext
  | ColDefComponentChoiceValidationContext
  | ColDefComponentTreeChoiceValidationContext
  | ColDefCurrencyValidationContext
  | ColDefDateValidationContext
  | ColDefDoubleValidationContext
  | ColDefEnumValidationContext
  | ColDefIntegerValidationContext
  | ColDefMonetaryValueValidationContext
  | ColDefPercentageValidationContext
  | ColDefStringValidationContext

/**
 * Specifies the source of currency rates for monetary value validation.
 */
type CurrencyRateListSupplier = 'COMPONENT' | 'DOCUMENT'

export {
  type ColDefDoubleValidationContext,
  type ColDefStringValidationContext,
  type ColDefValidationContextUnion,
}
