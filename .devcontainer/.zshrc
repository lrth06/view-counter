export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="robbyrussell"
zstyle ':omz:update' mode auto
zstyle ':omz:update' frequency 7
plugins=(git aws node npm docker zsh-syntax-highlighting)
source $ZSH/oh-my-zsh.sh
export LANG=en_US.UTF-8
alias zshconfig="code ~/.zshrc"
alias zsource="source ~/.zshrc"