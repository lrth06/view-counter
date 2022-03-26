export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="robbyrussell"
zstyle ':omz:update' mode auto
zstyle ':omz:update' frequency 7
source $ZSH/plugins/.zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source $ZSH/oh-my-zsh.sh
export LANG=en_US.UTF-8

plugins=(git aws node npm docker thefuck ctop)
alias zshconfig="code ~/.zshrc"
alias zsource="source ~/.zshrc"