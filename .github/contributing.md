<!-- write trunk based development contributing guidelines -->

# Contributing

## Local development

### Devcontainer

This repository utilizes a [devcontainer](https://code.visualstudio.com/docs/remote/containers) to provide a consistent development environment for the project. To utilize the devcontainer you must fist have [Docker](https://www.docker.com/) and [VS Code](https://code.visualstudio.com/) installed.

> **Note**: If you are using the devcontainer for the first time, you will be prompted to open the directory in the container. If you have previous selected NOT to open the directory, you will need to open the directory manually by hitting F1 to access the command palette and then selecting `Remote-Containers: Reopen in Container`.

Once the devcontainer has been built, all scripts from package.json will be availble, and node_modules will already be installed.

## Trunk Based Development

This repository utilizes [Trunk Based Development](https://trunkbaseddevelopment.com/) to unify the development and contribution process. To utilize the Trunk Based Development process you must first have [Git](https://git-scm.com/) installed.

When making a contribution to the project, the following steps should be respected:

```bash
# Create a branch
git checkout -b <branch-type>/<branch-name>
# Make changes to the branch
# Add files to the branch
git add <file-name>
# Alternatively: git add .
# Commit the changes
git commit -m "<branch-type>/<branch-name> - <commit-message>"
# Push the branch to the remote
git push origin <branch-type>/<branch-name>
```

From this point, you will need to submit a pull request against `trunk` to have your code reviewed and merged. Reviewers will be notified that you have submitted a pull request once the Build action has succeeded.

### Branch Types ([Conventional Commits](https://conventionalcommits.org/))

This repository utilizes the [Conventional Commits](https://conventionalcommits.org/) to further unify the development and contribution process. Used in tandem with [Trunk Based Development](https://trunkbaseddevelopment.com/), the following branch types are available:

| Branch Type | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| `feature`   | Adds tangible value to the functional code                   |
| `bugfix`    | Fixes a bug                                                  |
| `hotfix`    | Restores functionality to the project in the event of outage |
| `release`   | Adds a new version of the project                            |
| `docs`      | Updates documentation to the project                         |
| `chore`     | Changes to the project that do not change the codebase       |
