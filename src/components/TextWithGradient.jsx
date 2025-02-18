function TextWithGradient({
  className,
  children,
  fromColor,
  viaColor,
  toColor,
}) {
  return (
    <div className='inline-block bg-clip-text text-transparent bg-gradient-to-r p-0 from-purple-500 via-violet-500 to-pink-500'>
      {children}
    </div>
  )
}

export default TextWithGradient
