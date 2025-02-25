import Header from "./components/header"
import Footer from "./components/footer"
import Login from "./components/login"

function App() {
  

  return (
    <div className="flex flex-col min-h-screen">
     <main className="flex flex-col min-h-screen">
      <Header />
        <Login />
      <Footer />
      </main>
    </div>
  )
}

export default App
