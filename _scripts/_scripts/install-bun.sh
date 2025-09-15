#!/bin/bash

echo "🔧 Installing Bun..."

# Install Bun
curl -fsSL https://bun.sh/install | bash

# Set Bun in PATH for this session
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

bun --version
