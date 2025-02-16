function TextWithGradient({ children, fromColor, viaColor, toColor }) {
  return (
    <div className='inline-block bg-clip-text text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500'>
      {children}
    </div>
  )
}

export default TextWithGradient
