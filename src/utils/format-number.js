import { BigNumber, WrappedBigNumber } from 'utils/wrapped-big-number'
import { encodeNumberAsBase10String, encodeNumberAsJSNumber } from 'speedomatic'
import { augur, constants } from 'services/augurjs'
import { ZERO, TEN } from 'modules/trade/constants/numbers'
import addCommas from 'utils/add-commas-to-number'

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  Produces a formatted number object used for display and calculations
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

The main function is `formatNumber`, however there are top-level functions that wrap for common cases like `formatEther`, `formatShares`, etc.

A formatted number generally has three parts: the sign (+ or -), the stylized number, and a denomination (Eth, Rep, %, etc.)

The formatted number object that is returned looks something like this:
  {
    value: the parsed number in numerical form, 0 if a bad input was passed in, can be used in calculations

    formattedValue: the value in numerical form, possibly rounded, can be used in calculations
    formatted: the value in string form with possibly additional formatting, like comma separator, used for display

    o.roundedValue: the value in numerical form, with extra rounding, can be used in calculations
    o.rounded: the value in string form, with extra rounding and possibly additional formatting, like comma separator, used for display

    o.minimized: the value in string form, with trailing 0 decimals omitted, for example if the `formatted` value is 1.00, this minimized value would be 1
  }

The reason the number object has multiple states of rounding simultaneously,
is because the ui can use it for multiple purposes. For example, when showing ether,
we generally like to show it with 2 decimals, however when used in totals,
maximum precision is not necessary, and we can opt to show the `rounded` display, which is only 1 decimal.
Similar logic applies for `minimized`, sometimes we don't need to be consistent with the decimals
and just show the prettiest, smallest representation of the value.

The options object that is passed into `formatNumber` that enables all of this looks like:
  {
    decimals: the number of decimals for the precise case, can be 0-infinity
    decimalsRounded: the number of decimals for the prettier case, can be 0-infinity
    denomination: the string denomination of the number (ex. Eth, Rep, %), can be blank
    positiveSign: boolean whether to include a plus sign at the beginning of positive numbers
    zeroStyled: boolean, if true, when the value is 0, it formates it as a dash (-) instead
  }

TIP
Sometimes (not always) it is a good idea to use the formatted values in calculations,
rather than the original input number, so that values match up in the ui. For example, if you are
adding the numbers 1.11 and 1.44, but displaying them as 1.1 and 1.4, it may look awkward
if 1.1 + 1.4 = 2.6. If perfect precision isn't necessary, consider adding them using the formatted values.

*/

export function formatEther(num, opts) {
  return formatNumber(
    encodeNumberAsJSNumber(num),
    {
      decimals: constants.PRECISION.decimals,
      decimalsRounded: constants.PRECISION.decimals,
      denomination: ' ETH',
      positiveSign: false,
      zeroStyled: false,
      blankZero: false,
      bigUnitPostfix: false,
      ...opts,
    },
  )
}

export function formatEtherEstimate(num, opts) {
  return formatNumber(
    encodeNumberAsJSNumber(num),
    {
      decimals: constants.PRECISION.decimals,
      decimalsRounded: constants.PRECISION.decimals,
      denomination: ' ETH (estimated)',
      positiveSign: false,
      zeroStyled: false,
      blankZero: false,
      bigUnitPostfix: false,
      ...opts,
    },
  )
}

export function formatPercent(num, opts) {
  return formatNumber(
    encodeNumberAsJSNumber(num),
    {
      decimals: 2,
      decimalsRounded: 0,
      denomination: '%',
      positiveSign: false,
      zeroStyled: false,
      blankZero: false,
      bigUnitPostfix: false,
      ...opts,
    },
  )
}

export function formatShares(num, opts) {
  const formattedShares = formatNumber(
    encodeNumberAsJSNumber(num),
    {
      decimals: 2,
      decimalsRounded: 2,
      denomination: ` share${encodeNumberAsJSNumber(num) !== 1 ? 's' : ''}`,
      minimized: true,
      zeroStyled: false,
      blankZero: false,
      roundDown: true,
      bigUnitPostfix: true,
      ...opts,
    },
  )

  if (formattedShares.formattedValue === 1) {
    formattedShares.full = makeFull(formattedShares.formatted, ' share')
  }

  return formattedShares
}

export function formatRep(num, opts) {
  return formatNumber(
    encodeNumberAsJSNumber(num),
    {
      decimals: 2,
      decimalsRounded: 0,
      denomination: ' REP',
      positiveSign: false,
      zeroStyled: false,
      blankZero: false,
      bigUnitPostfix: false,
      ...opts,
    },
  )
}

export function formatRepTokens(num, opts) {
  return formatNumber(
    encodeNumberAsJSNumber(num),
    {
      decimals: 2,
      decimalsRounded: 2,
      denomination: ' REP Tokens',
      positiveSign: false,
      zeroStyled: false,
      blankZero: false,
      bigUnitPostfix: false,
      ...opts,
    },
  )
}

export function formatConfirmations(num, opts) {
  return formatNumber(
    Math.max(num, 0),
    {
      decimals: 0,
      decimalsRounded: 0,
      denomination: 'confirmations',
      positiveSign: false,
      zeroStyled: false,
      blankZero: false,
      bigUnitPostfix: false,
      ...opts,
    },
  )
}

export function formatNone() {
  return {
    value: 0,
    formattedValue: 0,
    formatted: '-',
    roundedValue: 0,
    rounded: '-',
    minimized: '-',
    denomination: '',
    full: '-',
  }
}

export function formatBlank() {
  return {
    value: 0,
    formattedValue: 0,
    formatted: '',
    roundedValue: 0,
    rounded: '',
    minimized: '',
    denomination: '',
    full: '',
  }
}

export function formatGasCostToEther(num, opts, gasPrice) {
  const { ETHER } = augur.rpc.constants
  const estimatedGasCost = WrappedBigNumber(num).times(WrappedBigNumber(gasPrice, 16))
  const ethGasCost = estimatedGasCost.dividedBy(ETHER) // convert to ether
  return formatGasCost(ethGasCost, opts).rounded
}

export function formatAttoRep(num, opts) {
  if (!num || num === 0 || isNaN(num)) return 0
  const { ETHER } = augur.rpc.constants
  return formatNumber(WrappedBigNumber(num.toString()).dividedBy(ETHER).toNumber(), opts)
}

export function formatGasCost(num, opts) {
  return formatNumber(
    num,
    {
      decimals: 0,
      decimalsRounded: 0,
      denomination: ' GWEI',
      positiveSign: false,
      zeroStyled: false,
      blankZero: false,
      bigUnitPostfix: false,
      ...opts,
    },
  )
}

const defaultFormatNumberOpts = {
  decimals: 0,
  decimalsRounded: 0,
  denomination: '',
  roundUp: false,
  roundDown: false,
  positiveSign: false,
  zeroStyled: true,
  minimized: false,
  blankZero: false,
  bigUnitPostfix: false,
}

export function formatNumber(num, opts = {}) {
  const {
    decimals,
    decimalsRounded,
    denomination,
    roundUp,
    roundDown,
    positiveSign,
    zeroStyled,
    blankZero,
    minimized,
    bigUnitPostfix,
  } = {
    ...defaultFormatNumberOpts,
    ...opts,
  }
  const out = {}
  const value = num != null ? WrappedBigNumber(num, 10) : ZERO

  if (value.eq(ZERO)) {
    if (zeroStyled) return formatNone()
    if (blankZero) return formatBlank()
  }

  const decimalsValue = TEN.exponentiatedBy(decimals)
  const decimalsRoundedValue = TEN.exponentiatedBy(decimalsRounded)

  let roundingMode
  if (roundDown) {
    roundingMode = BigNumber.ROUND_DOWN
  } else if (roundUp) {
    roundingMode = BigNumber.ROUND_UP
  } else {
    roundingMode = BigNumber.ROUND_HALF_EVEN
  }
  if (isNaN(parseFloat(num))) {
    out.value = 0
    out.formattedValue = 0
    out.formatted = '0'
    out.roundedValue = 0
    out.rounded = '0'
    out.minimized = '0'
  } else {
    out.value = value.toNumber()
    if (value.abs().lt(constants.PRECISION.zero)) {
      out.formattedValue = '0'
    } else if (value.abs().lt(constants.PRECISION.limit)) {
      if (!decimals) {
        out.formattedValue = '0'
      } else {
        out.formattedValue = value.toPrecision(decimals, roundingMode)
      }
    } else {
      out.formattedValue = value.times(decimalsValue).integerValue(roundingMode)
        .dividedBy(decimalsValue)
        .toFixed(decimals)
    }
    out.formatted = (bigUnitPostfix)
      ? addBigUnitPostfix(value, out.formattedValue)
      : addCommas(out.formattedValue)
    out.fullPrecision = value.toFixed()
    out.roundedValue = value.times(decimalsRoundedValue).integerValue(roundingMode).dividedBy(decimalsRoundedValue)
    out.rounded = (bigUnitPostfix)
      ? addBigUnitPostfix(value, out.roundedValue.toFixed(decimalsRounded))
      : addCommas(out.roundedValue.toFixed(decimalsRounded))
    out.minimized = addCommas(encodeNumberAsBase10String(out.formattedValue))
    out.formattedValue = encodeNumberAsJSNumber(out.formattedValue)
    out.roundedValue = out.roundedValue.toNumber()
  }

  if (positiveSign && !bigUnitPostfix) {
    if (out.formattedValue >= 0) {
      out.formatted = `+${out.formatted}`
      out.minimized = `+${out.minimized}`
    }
    if (out.roundedValue >= 0) {
      out.rounded = `+${out.rounded}`
    }
  }

  if (minimized) {
    out.formatted = out.minimized
  }

  out.denomination = denomination
  out.full = makeFull(out.formatted, out.denomination)

  return out
}

function addBigUnitPostfix(value, formattedValue) {
  let postfixed
  if (value.gt(WrappedBigNumber('1000000000000', 10))) {
    postfixed = '> 1T'
  } else if (value.gt(WrappedBigNumber('10000000000', 10))) {
    postfixed = value.dividedBy(WrappedBigNumber('1000000000', 10)).toFixed(0) + 'B'
  } else if (value.gt(WrappedBigNumber('10000000', 10))) {
    postfixed = value.dividedBy(WrappedBigNumber('1000000', 10)).toFixed(0) + 'M'
  } else if (value.gt(WrappedBigNumber('10000', 10))) {
    postfixed = value.dividedBy(WrappedBigNumber('1000', 10)).toFixed(0) + 'K'
  } else {
    postfixed = addCommas(formattedValue)
  }
  return postfixed
}

export function makeFull(formatted, denomination) {
  return formatted + denomination
}
