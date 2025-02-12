
function TextWithGradient({ children, fromColor, viaColor, toColor }) {
  return (
    <div className={`inline relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-${fromColor} via-${viaColor} to-${toColor} py-4`}>
      <span>
        {children}
      </span>
    </div>
  )
}

export default TextWithGradient
