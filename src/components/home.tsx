import { Button } from "../UI/Button"

const home = () => {
  return (
       <div className="flex flex-col min-h-screen bg-[#0f0f0f]">
      <div className="w-full h-[50vh] flex items-center justify-center bg-gradient-to-tr from-blue-600 to-purple-600">
        <h1 className="text-7xl font-bold text-center text-fuchsia-200 px-4">
          Salut! Bine ai venit pe pagina principala! Ce se "mananca" azi?
        </h1>
      </div>
      <div className = "flex flex-row items-center justify-center mt-8 gap-4" >
        <Button onClick={() => window.location.href = '/calculator'}>
          <h1 className="text-2xl font-bold mb-4 text-center">Calculator</h1>
        </Button>
        <Button onClick={() => window.location.href = '/calculatorstiintific'}>
          <h1 className="text-2xl font-bold mb-4 text-center">Calculator Stiintific</h1>
        </Button>
        <Button onClick={() => window.location.href = '/weather_app_example'}>
          <h1 className="text-2xl font-bold mb-4 text-center">Aplicatie Vreme</h1>
        </Button>
        <Button onClick={() => window.location.href = '/trade'}>
          <h1 className="text-2xl font-bold mb-4 text-center">Piata de Vanzari Actiuni/Crypto</h1>
        </Button>
      </div>
    </div>
    
  )
}

export default home
