import os

current_directory = os.getcwd()
ROOT_DIRECTORY = os.path.abspath(os.path.join(current_directory))
TUNEAPIKEY = "sk-tune-tWdlAZ7UylGzyEt7SNxFMly8eJVBHRJHgkj"
TUNEAPPURL = "https://proxy.tune.app/chat/completions"
CURRICULUMMODEL = "meta/llama-3.1-405b-instruct"
DATABASEDIR = os.path.join(ROOT_DIRECTORY, "DataBase")
CURRICULUMDATABASEDIR = os.path.join(DATABASEDIR, "Curriculum")
TUTORDATADIR = os.path.join(DATABASEDIR, "TutorData")
