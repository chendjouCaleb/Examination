using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Exam.Migrations
{
    public partial class Update1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_LevelSpecialities_LevelSpecialityId",
                table: "Courses");

            migrationBuilder.DropForeignKey(
                name: "FK_ScorePapers_Scores_ScoreId",
                table: "ScorePapers");

            migrationBuilder.DropForeignKey(
                name: "FK_Tests_Courses_CourseId",
                table: "Tests");

            migrationBuilder.DropForeignKey(
                name: "FK_Tests_ExaminationLevelSpecialities_ExaminationLevelSpecialityId",
                table: "Tests");

            migrationBuilder.DropIndex(
                name: "IX_Tests_ExaminationLevelSpecialityId",
                table: "Tests");

            migrationBuilder.DropIndex(
                name: "IX_ScorePapers_ScoreId",
                table: "ScorePapers");

            migrationBuilder.DropIndex(
                name: "IX_Courses_LevelSpecialityId",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "ExaminationLevelSpecialityId",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "GroupCount",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "ScoreId",
                table: "ScorePapers");

            migrationBuilder.DropColumn(
                name: "LevelSpecialityId",
                table: "Courses");

            migrationBuilder.AlterColumn<long>(
                name: "CourseId",
                table: "Tests",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddColumn<bool>(
                name: "IsGeneral",
                table: "Tests",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "MultipleScore",
                table: "Tests",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "Radical",
                table: "Tests",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "TestScoreId",
                table: "ScorePapers",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "TestLevelSpecialityId",
                table: "Papers",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LevelSpecialityId",
                table: "LevelSpecialities",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsGeneral",
                table: "Courses",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "TestGroupCorrectorCount",
                table: "Correctors",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "CourseLevelSpecialities",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    CourseId = table.Column<long>(nullable: true),
                    LevelSpecialityId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseLevelSpecialities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseLevelSpecialities_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CourseLevelSpecialities_LevelSpecialities_LevelSpecialityId",
                        column: x => x.LevelSpecialityId,
                        principalTable: "LevelSpecialities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TestScores",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Radical = table.Column<double>(nullable: false),
                    TestId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestScores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestScores_Tests_TestId",
                        column: x => x.TestId,
                        principalTable: "Tests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TestLevelSpecialities",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    TestId = table.Column<long>(nullable: true),
                    CourseLevelSpecialityId = table.Column<long>(nullable: true),
                    ExaminationLevelSpecialityId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestLevelSpecialities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestLevelSpecialities_CourseLevelSpecialities_CourseLevelSpecialityId",
                        column: x => x.CourseLevelSpecialityId,
                        principalTable: "CourseLevelSpecialities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TestLevelSpecialities_ExaminationLevelSpecialities_ExaminationLevelSpecialityId",
                        column: x => x.ExaminationLevelSpecialityId,
                        principalTable: "ExaminationLevelSpecialities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TestLevelSpecialities_Tests_TestId",
                        column: x => x.TestId,
                        principalTable: "Tests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ScorePapers_TestScoreId",
                table: "ScorePapers",
                column: "TestScoreId");

            migrationBuilder.CreateIndex(
                name: "IX_Papers_TestLevelSpecialityId",
                table: "Papers",
                column: "TestLevelSpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_LevelSpecialities_LevelSpecialityId",
                table: "LevelSpecialities",
                column: "LevelSpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseLevelSpecialities_CourseId",
                table: "CourseLevelSpecialities",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseLevelSpecialities_LevelSpecialityId",
                table: "CourseLevelSpecialities",
                column: "LevelSpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_TestLevelSpecialities_CourseLevelSpecialityId",
                table: "TestLevelSpecialities",
                column: "CourseLevelSpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_TestLevelSpecialities_ExaminationLevelSpecialityId",
                table: "TestLevelSpecialities",
                column: "ExaminationLevelSpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_TestLevelSpecialities_TestId",
                table: "TestLevelSpecialities",
                column: "TestId");

            migrationBuilder.CreateIndex(
                name: "IX_TestScores_TestId",
                table: "TestScores",
                column: "TestId");

            migrationBuilder.AddForeignKey(
                name: "FK_LevelSpecialities_LevelSpecialities_LevelSpecialityId",
                table: "LevelSpecialities",
                column: "LevelSpecialityId",
                principalTable: "LevelSpecialities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Papers_TestLevelSpecialities_TestLevelSpecialityId",
                table: "Papers",
                column: "TestLevelSpecialityId",
                principalTable: "TestLevelSpecialities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ScorePapers_TestScores_TestScoreId",
                table: "ScorePapers",
                column: "TestScoreId",
                principalTable: "TestScores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tests_Courses_CourseId",
                table: "Tests",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LevelSpecialities_LevelSpecialities_LevelSpecialityId",
                table: "LevelSpecialities");

            migrationBuilder.DropForeignKey(
                name: "FK_Papers_TestLevelSpecialities_TestLevelSpecialityId",
                table: "Papers");

            migrationBuilder.DropForeignKey(
                name: "FK_ScorePapers_TestScores_TestScoreId",
                table: "ScorePapers");

            migrationBuilder.DropForeignKey(
                name: "FK_Tests_Courses_CourseId",
                table: "Tests");

            migrationBuilder.DropTable(
                name: "TestLevelSpecialities");

            migrationBuilder.DropTable(
                name: "TestScores");

            migrationBuilder.DropTable(
                name: "CourseLevelSpecialities");

            migrationBuilder.DropIndex(
                name: "IX_ScorePapers_TestScoreId",
                table: "ScorePapers");

            migrationBuilder.DropIndex(
                name: "IX_Papers_TestLevelSpecialityId",
                table: "Papers");

            migrationBuilder.DropIndex(
                name: "IX_LevelSpecialities_LevelSpecialityId",
                table: "LevelSpecialities");

            migrationBuilder.DropColumn(
                name: "IsGeneral",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "MultipleScore",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "Radical",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "TestScoreId",
                table: "ScorePapers");

            migrationBuilder.DropColumn(
                name: "TestLevelSpecialityId",
                table: "Papers");

            migrationBuilder.DropColumn(
                name: "LevelSpecialityId",
                table: "LevelSpecialities");

            migrationBuilder.DropColumn(
                name: "IsGeneral",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "TestGroupCorrectorCount",
                table: "Correctors");

            migrationBuilder.AlterColumn<long>(
                name: "CourseId",
                table: "Tests",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ExaminationLevelSpecialityId",
                table: "Tests",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GroupCount",
                table: "Tests",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<long>(
                name: "ScoreId",
                table: "ScorePapers",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "LevelSpecialityId",
                table: "Courses",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tests_ExaminationLevelSpecialityId",
                table: "Tests",
                column: "ExaminationLevelSpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_ScorePapers_ScoreId",
                table: "ScorePapers",
                column: "ScoreId");

            migrationBuilder.CreateIndex(
                name: "IX_Courses_LevelSpecialityId",
                table: "Courses",
                column: "LevelSpecialityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_LevelSpecialities_LevelSpecialityId",
                table: "Courses",
                column: "LevelSpecialityId",
                principalTable: "LevelSpecialities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ScorePapers_Scores_ScoreId",
                table: "ScorePapers",
                column: "ScoreId",
                principalTable: "Scores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tests_Courses_CourseId",
                table: "Tests",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tests_ExaminationLevelSpecialities_ExaminationLevelSpecialityId",
                table: "Tests",
                column: "ExaminationLevelSpecialityId",
                principalTable: "ExaminationLevelSpecialities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
