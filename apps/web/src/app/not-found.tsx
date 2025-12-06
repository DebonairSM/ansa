import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-custom py-20 text-center">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Página não encontrada</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Desculpe, não conseguimos encontrar a página que você está procurando.
      </p>
      <Link 
        href="/pt" 
        className="btn-primary inline-block no-underline"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
