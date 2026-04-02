function App() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-text-primary">T-Drum</h1>
        <p className="text-text-secondary">Suivi de progression batterie</p>
        <div className="h-2 w-48 mx-auto bg-bg-tertiary rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-accent-primary rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default App
