# Generate SSH key for GitHub → Hostinger deployment
ssh-keygen -t ed25519 -C "github-deploy-rentingexplained" -f $HOME\.ssh\hostinger_deploy

# View the public key (add this to Hostinger)
Get-Content $HOME\.ssh\hostinger_deploy.pub

# View the private key (add this to GitHub secret HOSTINGER_SSH_KEY)
Get-Content $HOME\.ssh\hostinger_deploy
