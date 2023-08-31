'use client';

export default function Home() {
  const causeError = async () => {
    const res = await fetch('/api/error');
    if (!res.ok) {
      throw new Error('Example Frontend Error');
    }
  };

  return (
    <div>
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Trigger a sample error:</p>
        <button
          type="button"
          style={{
            padding: '12px',
            cursor: 'pointer',
            backgroundColor: '#AD6CAA',
            borderRadius: '4px',
            border: 'none',
            color: 'white',
            fontSize: '14px',
            margin: '18px',
          }}
          onClick={
            () => void causeError()
            /*
                        const transaction = Sentry.startTransaction({
                            name: 'Example Frontend Transaction',
                        });

                        Sentry.configureScope((scope) => {
                            scope.setSpan(transaction);
                        });

                        try {
                            const res = await fetch('/api/error');
                            if (!res.ok) {
                                throw new Error('Example Frontend Error');
                            }
                        } finally {
                            transaction.finish();
                        }

                         */
          }
        >
          Throw error!
        </button>
      </main>
    </div>
  );
}
