const chalk = require('chalk');
const mkdirp = require('mkdirp');
const Generator = require('yeoman-generator');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('update', {
      type: Boolean,
      required: false,
      default: false,
      desc: 'Update current code'
    });
  }

  initializing() {
    // Read the package.json if already exists.
    this.package = this.fs.readJSON(this.destinationPath('package.json'), {});

    // Pre set the default props from the information we have at this point.
    this.props = {
      name: this.package.name,
      description: this.package.description,
      version: this.package.version
    };
  }

  prompting() {
    this.log(yosay(`Welcome to ${chalk.red('API Server Generator')}!`));

    const prompts = [
      {
        type: 'confirm',
        name: 'createDirectory',
        message: 'Would you like to create a new directory for your project?',
        default: false,
        when: !this.options.update
      },
      {
        type: 'text',
        name: 'name',
        message: 'Project Name',
        when: !this.options.update
      },
      {
        type: 'text',
        name: 'description',
        message: 'Description',
        when: !this.options.update
      },
      {
        type: 'text',
        name: 'authorName',
        message: "Author's Name",
        default: this.user.git.name(),
        when: !this.options.update
      },
      {
        type: 'text',
        name: 'authorEmail',
        message: "Author's Email",
        default: this.user.git.email(),
        when: !this.options.update
      },
      {
        type: 'confirm',
        name: 'update',
        message: `Would you like to update the server ${this.props.name}?`,
        when: this.options.update
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = Object.assign({}, this.props, props);
    });
  }

  configuring() {}

  writing() {
    this.log(chalk.green('Writing'));
    this._createDirectory();
    this._copyFiles();
    this._updatePackage();
  }

  conflicts() {}

  install() {
    this.log(chalk.green('Installing'));
    this.installDependencies({ npm: true, bower: false });
  }

  end() {}

  _createDirectory() {
    const directoryName = this._getProjectName();
    if (this.props.createDirectory) {
      this.log(`${chalk.green('Creating directory')}: ${chalk.cyan(directoryName)}`);
      this.options.directoryName = directoryName;
      this.destinationRoot(this.options.directoryName);
    }
  }

  _copyFiles() {
    this.log(chalk.green('Copying server files...'));

    // Copy all files from templates directory.
    // Ignore package.json because we'll create later.
    this.fs.copy(
      this.templatePath('**/*'),
      this.destinationPath('.'),
      {
        globOptions: {
          dot: true,
          debug: true,
          ignore: ['**/package*']
        }
      },
      this
    );

    // Add empty folders.
    mkdirp('server/controllers');
    mkdirp('server/models');
  }

  _updatePackage() {
    this.log(chalk.green('Creating package.json...'));
    // Fill the package.json data with the user input.
    const packageInfo = {
      name: this._getProjectName(),
      description: this.props.description,
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail
      }
    };
    const originalPackage = this.fs.readJSON(this.templatePath('package.json'), {});
    const userPackage = this.fs.readJSON(this.destinationPath('package.json'), {});
    console.log(Object.keys(userPackage));
    packageInfo.dependencies = Object.assign(
      {},
      originalPackage.dependencies,
      userPackage.dependencies
    );

    this.fs.writeJSON(
      this.destinationPath('package.json'),
      Object.assign({}, originalPackage, packageInfo)
    );
  }

  _getProjectName() {
    return this.props.name.replace(/\s+/g, '-').toLowerCase();
  }
};
