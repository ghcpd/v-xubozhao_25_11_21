const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Root route - serves comparison page
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UI/UX Demo - Issue Detection & Fixes</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
    <header class="bg-blue-600 text-white py-8">
        <div class="container mx-auto px-6">
            <h1 class="text-4xl font-bold mb-2">UI/UX Improvement Demo</h1>
            <p class="text-blue-100">Compare buggy vs. fixed dashboard implementations</p>
        </div>
    </header>
    
    <main class="container mx-auto px-6 py-12">
        <div class="grid md:grid-cols-2 gap-8 mb-8">
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex items-center mb-4">
                    <span class="text-3xl mr-3">🐛</span>
                    <h2 class="text-2xl font-bold text-gray-800">Buggy Version</h2>
                </div>
                <p class="text-gray-600 mb-4">
                    Contains 5 intentional UI/UX issues:
                </p>
                <ul class="list-disc list-inside text-gray-700 space-y-2 mb-6">
                    <li>Missing ARIA labels on navigation</li>
                    <li>Low contrast button text</li>
                    <li>Uneven padding & inconsistent spacing</li>
                    <li>Illogical button grouping</li>
                    <li>Broken responsive layout (&lt;480px)</li>
                </ul>
                <a href="/demo_dashboard_buggy.html" 
                   class="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                    View Buggy Dashboard
                </a>
            </div>
            
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex items-center mb-4">
                    <span class="text-3xl mr-3">✅</span>
                    <h2 class="text-2xl font-bold text-gray-800">Fixed Version</h2>
                </div>
                <p class="text-gray-600 mb-4">
                    All issues resolved with best practices:
                </p>
                <ul class="list-disc list-inside text-gray-700 space-y-2 mb-6">
                    <li>Proper semantic HTML & ARIA labels</li>
                    <li>High contrast colors (WCAG compliant)</li>
                    <li>Consistent Tailwind spacing system</li>
                    <li>Logical action button grouping</li>
                    <li>Fully responsive design</li>
                </ul>
                <a href="/demo_dashboard_fixed.html" 
                   class="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                    View Fixed Dashboard
                </a>
            </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Test Results</h2>
            <p class="text-gray-600 mb-4">
                Run automated tests to verify all issues are detected and fixed:
            </p>
            <code class="block bg-gray-900 text-green-400 p-4 rounded-lg mb-4">
                npm test
            </code>
            <p class="text-sm text-gray-500">
                Or use <code class="bg-gray-200 px-2 py-1 rounded">./run_tests.sh</code> after running <code class="bg-gray-200 px-2 py-1 rounded">./setup.sh</code>
            </p>
        </div>
    </main>
    
    <footer class="bg-gray-800 text-white py-6 mt-12">
        <div class="container mx-auto px-6 text-center">
            <p>&copy; 2025 UI/UX Improvement Demo</p>
        </div>
    </footer>
</body>
</html>
    `);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📊 Buggy Dashboard: http://localhost:${PORT}/demo_dashboard_buggy.html`);
    console.log(`✅ Fixed Dashboard: http://localhost:${PORT}/demo_dashboard_fixed.html`);
});
