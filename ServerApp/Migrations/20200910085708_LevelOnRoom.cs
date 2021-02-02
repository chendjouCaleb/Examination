using Microsoft.EntityFrameworkCore.Migrations;

namespace Exam.Migrations
{
    public partial class LevelOnRoom : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LevelSpecialities_LevelSpecialities_LevelSpecialityId",
                table: "LevelSpecialities");

            migrationBuilder.DropIndex(
                name: "IX_LevelSpecialities_LevelSpecialityId",
                table: "LevelSpecialities");

            migrationBuilder.DropColumn(
                name: "LevelSpecialityId",
                table: "LevelSpecialities");

            migrationBuilder.AddColumn<long>(
                name: "LevelId",
                table: "Rooms",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_LevelId",
                table: "Rooms",
                column: "LevelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Levels_LevelId",
                table: "Rooms",
                column: "LevelId",
                principalTable: "Levels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Levels_LevelId",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_LevelId",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "LevelId",
                table: "Rooms");

            migrationBuilder.AddColumn<long>(
                name: "LevelSpecialityId",
                table: "LevelSpecialities",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_LevelSpecialities_LevelSpecialityId",
                table: "LevelSpecialities",
                column: "LevelSpecialityId");

            migrationBuilder.AddForeignKey(
                name: "FK_LevelSpecialities_LevelSpecialities_LevelSpecialityId",
                table: "LevelSpecialities",
                column: "LevelSpecialityId",
                principalTable: "LevelSpecialities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
